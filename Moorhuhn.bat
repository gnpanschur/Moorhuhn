@echo off
title Moorhuhn Arcade Shooter - PC Edition
cls
echo =======================================================
echo              MOORHUHN ARCADE SHOOTER
echo =======================================================
echo.
echo Starte lokalen Server fuer das Spiel...
echo.

:: Start Vite dev server in background
start /b npm run dev >nul 2>&1

:: Wait 2 seconds for Vite server to boot up
timeout /t 2 /nobreak >nul

:: Open game automatically in default web browser
echo Oeffne Moorhuhn im Browser...
start http://localhost:5173

echo.
echo =======================================================
echo  Das Spiel laeuft jetzt unter: http://localhost:5173
echo  Lasse dieses Fenster geoffnet, solange du spielst!
echo =======================================================
echo.
echo Druecke eine beliebige Taste, um den Server zu beenden...
pause >nul
