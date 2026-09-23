@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Installing Loomieloops...
  call npm install
)
echo Opening Loomieloops at http://localhost:5180/
echo Port 5173 is left free for your other project.
start "" "http://localhost:5180/"
call npm run dev
pause
