@echo off
setlocal
set "SRC=D:\projects\narwhal-thai-table\Narwhal Thai Table"
set "CLONE=D:\projects\narwhal-deploy"
set "APP=%CLONE%\Narwhal Thai Table"
set "LOG=D:\projects\narwhal-thai-table\control-room-deploy-log.txt"

echo Deploying Owner Control Room... (log: control-room-deploy-log.txt)
echo === CLONE FRESH FROM GITHUB === > "%LOG%"
if exist "%CLONE%" rmdir /s /q "%CLONE%"
git clone https://github.com/AKxNRWL/narwhal-thai-table.git "%CLONE%" >> "%LOG%" 2>&1
if errorlevel 1 goto failed
echo CLONE_OK >> "%LOG%"

echo === COPY Control Room files === >> "%LOG%"
if not exist "%APP%\app\api\owner\login" mkdir "%APP%\app\api\owner\login"
if not exist "%APP%\app\api\owner\logout" mkdir "%APP%\app\api\owner\logout"
if not exist "%APP%\app\api\owner\me" mkdir "%APP%\app\api\owner\me"
if not exist "%APP%\app\api\owner\data" mkdir "%APP%\app\api\owner\data"
copy /y "%SRC%\app\stats\page.tsx"           "%APP%\app\stats\page.tsx"           >> "%LOG%" 2>&1
copy /y "%SRC%\app\api\owner\login\route.ts"  "%APP%\app\api\owner\login\route.ts"  >> "%LOG%" 2>&1
copy /y "%SRC%\app\api\owner\logout\route.ts" "%APP%\app\api\owner\logout\route.ts" >> "%LOG%" 2>&1
copy /y "%SRC%\app\api\owner\me\route.ts"     "%APP%\app\api\owner\me\route.ts"     >> "%LOG%" 2>&1
copy /y "%SRC%\app\api\owner\data\route.ts"   "%APP%\app\api\owner\data\route.ts"   >> "%LOG%" 2>&1
copy /y "%SRC%\lib\tenants.ts"                "%APP%\lib\tenants.ts"                >> "%LOG%" 2>&1
copy /y "%SRC%\lib\session.ts"                "%APP%\lib\session.ts"                >> "%LOG%" 2>&1
copy /y "%SRC%\lib\statsAggregate.ts"         "%APP%\lib\statsAggregate.ts"         >> "%LOG%" 2>&1
copy /y "%SRC%\.gitignore"                    "%APP%\.gitignore"                    >> "%LOG%" 2>&1

echo === COMMIT + PUSH === >> "%LOG%"
cd /d "%CLONE%"
git config user.email "special.akusa@gmail.com"
git config user.name "Kunanan"
git add -A >> "%LOG%" 2>&1
git commit -m "Owner Control Room: secure cookie login + reservations/messages panels, tenant-aware" >> "%LOG%" 2>&1
git push origin main >> "%LOG%" 2>&1
echo PUSH_ERRORLEVEL=%errorlevel% >> "%LOG%"
git log --oneline -4 >> "%LOG%" 2>&1
echo ALL_DONE >> "%LOG%"
echo.
echo DONE - pushed to GitHub. Netlify will AUTO-DEPLOY in ~1-2 min.
echo Do NOT click Trigger deploy - it cancels the running auto build. Just wait, then refresh the site.
echo If the deploy fails, open control-room-deploy-log.txt and send it to Claude.
pause
exit /b 0

:failed
echo CLONE FAILED - open control-room-deploy-log.txt and send it to Claude.
pause
exit /b 1
