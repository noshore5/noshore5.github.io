@echo off
REM Windows batch script to add, commit, and push all changes to origin main

REM Count non-empty lines in shakespeare_quotes.txt
set QUOTE_COUNT=0
for /f "usebackq tokens=* delims=" %%A in (shakespeare_quotes.txt) do (
  if not "%%A"=="" set /a QUOTE_COUNT+=1
)
REM Generate random number between 1 and QUOTE_COUNT
set /a RAND_LINE=%RANDOM% %% %QUOTE_COUNT% + 1
REM Get the random quote
setlocal enabledelayedexpansion
set QUOTE=
set LINE_NUM=0
for /f "usebackq tokens=* delims=" %%B in (shakespeare_quotes.txt) do (
  if not "%%B"=="" (
    set /a LINE_NUM+=1
    if !LINE_NUM! equ %RAND_LINE% set QUOTE=%%B
  )
)
endlocal & set QUOTE=%QUOTE%
REM Fallback if QUOTE is empty
if "%QUOTE%"=="" set QUOTE=Auto commit

git add -A
if %errorlevel% neq 0 exit /b %errorlevel%

git commit -m "%QUOTE%"
if %errorlevel% neq 0 exit /b %errorlevel%

git push origin main
if %errorlevel% neq 0 exit /b %errorlevel%

echo Git push complete.

