@echo off
cd /d "D:\projects\narwhal-thai-table"
set "LOG=%~dp0recover-log.txt"
echo === FIX .git PERMS === > "%LOG%"
if exist ".git\index.lock" del /f /q ".git\index.lock"
takeown /f ".git" /r /d y >nul 2>&1
icacls ".git" /reset /T /C /Q >nul 2>&1
icacls ".git" /grant "%USERNAME%:(OI)(CI)F" /T /C /Q >nul 2>&1
echo perms_done >> "%LOG%"
echo === ADD === >> "%LOG%"
git add -A >> "%LOG%" 2>&1
echo === COMMIT === >> "%LOG%"
git commit -m "Aileen: varied greetings, narwhal icon, send-message to welcome@, persona" >> "%LOG%" 2>&1
echo === PULL --rebase === >> "%LOG%"
git pull --rebase origin main >> "%LOG%" 2>&1
if errorlevel 1 git rebase --abort >> "%LOG%" 2>&1
echo === PUSH === >> "%LOG%"
git push origin main >> "%LOG%" 2>&1
echo === RESULT LOG === >> "%LOG%"
git log --oneline -5 >> "%LOG%" 2>&1
echo === STATUS === >> "%LOG%"
git status -sb >> "%LOG%" 2>&1
echo ALL_DONE >> "%LOG%"
echo.
echo Done - see recover-log.txt
pause
