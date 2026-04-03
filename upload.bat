@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   OctiClaw Git 上传脚本
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] 配置 Git 用户...
git config user.name "gpgpt1999"
git config user.email "gpgpt1999@github.com"

echo.
echo [2/4] 设置远程仓库...
git remote set-url origin https://gpgpt1999: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@github.com/gpgpt1999/OctiClaw.git

echo.
echo [3/4] 推送到 GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ 推送失败！请检查网络连接或 Token 权限
    pause
    exit /b 1
)

echo.
echo [4/4] 启用 GitHub Pages...
curl -s -X POST -H "Authorization: token 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" ^
  -H "Accept: application/vnd.github.v3+json" ^
  https://api.github.com/repos/gpgpt1999/OctiClaw/pages ^
  -d '{"source":{"branch":"main","path":"/website"}}' >nul 2>&1

echo.
echo ========================================
echo ✅ 上传成功！
echo.
echo 官网地址: https://gpgpt1999.github.io/OctiClaw/
echo.
echo 请在 GitHub 上手动启用 Pages:
echo 1. 进入 https://github.com/gpgpt1999/OctiClaw/settings/pages
echo 2. Source 选择 "Deploy from a branch"
echo 3. Branch 选择 "main" 和 "/ (root)"
echo 4. 点击 Save
echo ========================================
pause