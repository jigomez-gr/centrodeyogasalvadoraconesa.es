@echo off
chcp 65001 >nul
setlocal EnableExtensions

cd /d "%~dp0"

echo ============================================
echo   SUBIR CAMBIOS A GITHUB
echo   salvadora
echo ============================================
echo.

REM ============================================================
REM 1. COMPROBAR GIT
REM ============================================================

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Esta carpeta no es un repositorio Git.
    exit /b 1
)

REM ============================================================
REM 2. COMPROBAR GIT LFS
REM ============================================================

git lfs version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git LFS no esta instalado.
    exit /b 2
)

git lfs install >nul 2>&1

REM ============================================================
REM 3. COMPROBAR QUE MP4 USA LFS
REM ============================================================

for /f "tokens=3" %%A in ('git check-attr filter -- public/videos/itinerario-4.mp4') do (
    if /I not "%%A"=="lfs" (
        echo [ERROR] Los MP4 no estan configurados correctamente para Git LFS.
        echo.
        git check-attr filter -- public/videos/itinerario-4.mp4
        echo.
        echo Revisa .gitattributes.
        exit /b 3
    )
)

echo [OK] Git LFS configurado.
echo.

REM ============================================================
REM 4. MOSTRAR CAMBIOS
REM ============================================================

echo Cambios detectados:
echo.
git status -s
echo.

REM ============================================================
REM 5. MENSAJE DEL COMMIT
REM
REM Si un agente llama:
REM subir.bat "Cambio realizado por agente"
REM
REM Si no se pasa mensaje, crea uno automatico.
REM ============================================================

set "MSG=%~1"

if "%MSG%"=="" (
    set "MSG=Actualizacion automatica"
)

echo Mensaje:
echo %MSG%
echo.

REM ============================================================
REM 6. AÑADIR CAMBIOS
REM ============================================================

echo Anadiendo cambios...
git add -A

if errorlevel 1 (
    echo [ERROR] git add ha fallado.
    exit /b 4
)

REM ============================================================
REM 7. COMPROBAR QUE NO HAY MP4 GRANDES GUARDADOS DIRECTAMENTE
REM ============================================================

echo Comprobando Git LFS...

git lfs status

if errorlevel 1 (
    echo [ERROR] Error comprobando Git LFS.
    exit /b 5
)

REM ============================================================
REM 8. SI NO HAY CAMBIOS, NO HACER COMMIT
REM ============================================================

git diff --cached --quiet

if not errorlevel 1 (
    echo.
    echo [INFO] No hay cambios nuevos para guardar.
    goto COMPROBAR_REMOTO
)

REM ============================================================
REM 9. CREAR COMMIT
REM ============================================================

echo.
echo Creando commit...

git commit -m "%MSG%"

if errorlevel 1 (
    echo [ERROR] No se pudo crear el commit.
    exit /b 6
)

REM ============================================================
REM 10. COMPROBAR REMOTO SIN HACER PULL AUTOMATICO
REM ============================================================

:COMPROBAR_REMOTO

echo.
echo Comprobando GitHub...

git fetch origin

if errorlevel 1 (
    echo [ERROR] No se pudo acceder a GitHub.
    exit /b 7
)

REM Si origin/main contiene commits que main local no tiene,
REM se detiene. No hacemos pull/rebase automaticamente.

git merge-base --is-ancestor origin/main main >nul 2>&1

if errorlevel 1 (
    echo.
    echo ============================================
    echo [ERROR] GITHUB TIENE CAMBIOS NUEVOS
    echo ============================================
    echo.
    echo No se hace pull ni rebase automaticamente.
    echo Se detiene para evitar conflictos.
    echo.
    exit /b 8
)

REM ============================================================
REM 11. PUSH
REM ============================================================

echo.
echo Subiendo a GitHub...
echo.

git push origin main

if errorlevel 1 (
    echo.
    echo [ERROR] El push ha fallado.
    exit /b 9
)

REM ============================================================
REM 12. COMPROBACION FINAL
REM ============================================================

echo.
git status --short

echo.
echo ============================================
echo   SUBIDA CORRECTA
echo ============================================
echo.

exit /b 0