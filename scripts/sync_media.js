const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse .env if present
const envPath = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const k = trimmed.substring(0, idx).trim();
      let v = trimmed.substring(idx + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      if (!process.env[k]) {
        process.env[k] = v;
      }
    }
  }
}

/**
 * Script de sincronización inteligente de medios hacia el servidor de producción.
 */
function runSync() {
  const localBase =
    process.env.MEDIA_LOCAL_PATH ||
    process.env.MEDIA_STORAGE_ROOT ||
    path.resolve(__dirname, '..', '..', 'media_base');

  const remoteHost = process.env.MEDIA_SYNC_HOST || '192.168.1.17';
  const remoteUser = process.env.MEDIA_SYNC_USER || 'root';
  const remotePort = process.env.MEDIA_SYNC_PORT || '22';
  const remotePath =
    process.env.MEDIA_SYNC_REMOTE_PATH || '/var/data/salvadora/media';

  const cacheFile = path.join(__dirname, '.media_manifest.json');

  console.log('====================================================');
  console.log('  SINCRONIZACION AUTOMATICA DE MEDIOS Y VIDEOS');
  console.log(`  Origen local:   ${localBase}`);
  console.log(`  Destino remoto: ${remoteUser}@${remoteHost}:${remotePath}`);
  console.log('====================================================\n');

  if (!fs.existsSync(localBase)) {
    console.log(`[INFO] Carpeta local no encontrada: ${localBase}. Nada que sincronizar.`);
    return;
  }

  // Cargar estado anterior de hashes / fecha modificación
  let previousManifest = {};
  if (fs.existsSync(cacheFile)) {
    try {
      previousManifest = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    } catch (e) {
      previousManifest = {};
    }
  }

  const currentManifest = {};
  const changedFiles = [];

  function scanDir(dir, relPath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relative = path.join(relPath, entry.name).replace(/\\/g, '/');

      if (entry.isDirectory()) {
        scanDir(fullPath, relative);
      } else if (entry.isFile()) {
        const stat = fs.statSync(fullPath);
        const signature = `${stat.size}_${stat.mtimeMs}`;
        currentManifest[relative] = signature;

        if (previousManifest[relative] !== signature) {
          changedFiles.push({ relative, fullPath, size: stat.size });
        }
      }
    }
  }

  scanDir(localBase);

  if (changedFiles.length === 0) {
    console.log('✓ No hay videos, flyers o documentos nuevos o modificados desde la última sincronización.\n');
    return;
  }

  console.log(`Se han detectado ${changedFiles.length} archivo(s) nuevo(s) o modificado(s):`);
  for (const f of changedFiles) {
    const mb = (f.size / (1024 * 1024)).toFixed(2);
    console.log(`  • ${f.relative} (${mb} MB)`);
  }
  console.log('');

  // Probar conectividad SSH rápida (2 segundos) para no bloquear subir.bat si no hay clave pública configurada
  let canConnectSsh = false;
  try {
    execSync(`ssh -p ${remotePort} -o BatchMode=yes -o ConnectTimeout=2 ${remoteUser}@${remoteHost} "exit 0"`, {
      stdio: 'ignore',
      timeout: 3000,
    });
    canConnectSsh = true;
  } catch (e) {
    canConnectSsh = false;
  }

  if (!canConnectSsh) {
    console.log(`[INFO] No hay conexión SSH directa sin contraseña con ${remoteUser}@${remoteHost}.`);
    console.log(`Para subir los archivos modificados a producción puedes ejecutar manualmente:`);
    console.log(`       scp -P ${remotePort} -r "${localBase}/*" ${remoteUser}@${remoteHost}:${remotePath}/`);
    console.log(`(O configura tu clave SSH con: ssh-copy-id ${remoteUser}@${remoteHost} para subida 100% automática)\n`);
    // Guardamos estado para no repetir el aviso si no hay cambios adicionales
    fs.writeFileSync(cacheFile, JSON.stringify(currentManifest, null, 2), 'utf8');
    return;
  }

  console.log('Transfiriendo archivos modificados al servidor con scp...');
  let successCount = 0;

  for (const f of changedFiles) {
    const remoteDest = `${remotePath}/${path.dirname(f.relative).replace(/\\/g, '/')}`.replace(/\/$/, '');
    const remoteTarget = `${remotePath}/${f.relative.replace(/\\/g, '/')}`;

    try {
      execSync(`ssh -p ${remotePort} -o BatchMode=yes -o ConnectTimeout=5 ${remoteUser}@${remoteHost} "mkdir -p '${remoteDest}'"`, { stdio: 'ignore' });
    } catch (e) {}

    const scpCmd = `scp -P ${remotePort} -o ConnectTimeout=15 "${f.fullPath}" "${remoteUser}@${remoteHost}:${remoteTarget}"`;
    try {
      console.log(`  -> Subiendo ${f.relative}...`);
      execSync(scpCmd, { stdio: 'inherit' });
      successCount++;
    } catch (err) {
      console.warn(`  [AVISO] Falló transferencia de ${f.relative}.`);
    }
  }

  fs.writeFileSync(cacheFile, JSON.stringify(currentManifest, null, 2), 'utf8');
  if (successCount > 0) {
    console.log(`\n✓ ${successCount} archivo(s) sincronizado(s) exitosamente con ${remoteHost}.`);
  }
}

try {
  runSync();
} catch (e) {
  console.error('[AVISO] Error en sincronización de medios:', e.message);
}
