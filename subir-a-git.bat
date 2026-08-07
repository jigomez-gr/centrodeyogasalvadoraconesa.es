@echo off
chcp 65001 >nul
setlocal

rem Este script sube los cambios de NUEVO_PROYECTO al repositorio de GitHub.
rem Se coloca dentro de NUEVO_PROYECTO (que ya es el repositorio git) y
rem funciona haciendo doble clic, sin necesidad de abrir una terminal.

cd /d "%~dp0"

echo ============================================
echo   Subir cambios a GitHub (Salvadora Conesa)
echo ============================================
echo.
echo Cambios detectados:
git status -s
echo.

set /p MSG="Describe brevemente el cambio (Enter para mensaje automatico): "
if "%MSG%"=="" set MSG=Actualizacion del %date% %time%

git add -A
git commit -m "%MSG%"

echo.
echo Sincronizando con GitHub antes de subir...
git pull --rebase origin master

echo.
echo Subiendo a GitHub...
git push origin master

echo.
echo ============================================
echo   Listo. Cambios subidos a GitHub (master).
echo.
echo   Dokploy tiene activado "Autodeploy: On Push",
echo   asi que deberia desplegar solo en unos minutos.
echo   Si no ves el cambio en la web, entra al panel:
echo   http://192.168.1.17:3000
echo   y dale a "Deploy" a mano en la app
echo   centrodeyogasalvadoraconesa.
echo ============================================
pause
