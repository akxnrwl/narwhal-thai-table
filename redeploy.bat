@echo off
set "OLD=D:\projects\narwhal-thai-table\Narwhal Thai Table"
set "CLONE=D:\projects\narwhal-deploy"
set "APP=%CLONE%\Narwhal Thai Table"
set "LOG=D:\projects\narwhal-thai-table\redeploy-log.txt"
echo === CLONE FRESH FROM GITHUB === > "%LOG%"
if exist "%CLONE%" rmdir /s /q "%CLONE%"
git clone https://github.com/AKxNRWL/narwhal-thai-table.git "%CLONE%" >> "%LOG%" 2>&1
echo CLONE_ERR=%errorlevel% >> "%LOG%"
echo === COPY my 4 edited files === >> "%LOG%"
copy /y "%OLD%\components\ChatWidget.tsx" "%APP%\components\ChatWidget.tsx" >> "%LOG%" 2>&1
copy /y "%OLD%\lib\message.ts" "%APP%\lib\message.ts" >> "%LOG%" 2>&1
copy /y "%OLD%\app\api\chat\route.ts" "%APP%\app\api\chat\route.ts" >> "%LOG%" 2>&1
copy /y "%OLD%\lib\chatKnowledge.ts" "%APP%\lib\chatKnowledge.ts" >> "%LOG%" 2>&1
echo === COMMIT + PUSH === >> "%LOG%"
cd /d "%CLONE%"
git config user.email "special.akusa@gmail.com"
git config user.name "Kunanan"
git add -A >> "%LOG%" 2>&1
git commit -m "Aileen: varied greetings, narwhal icon, send-message to welcome@, persona" >> "%LOG%" 2>&1
git push origin main >> "%LOG%" 2>&1
echo PUSH_ERR=%errorlevel% >> "%LOG%"
git log --oneline -4 >> "%LOG%" 2>&1
echo ALL_DONE >> "%LOG%"
echo.
echo Done - see redeploy-log.txt
pause
