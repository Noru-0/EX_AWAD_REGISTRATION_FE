@echo off
REM Frontend Environment Setup Script for Windows

echo =====================================
echo Frontend Environment Configuration
echo =====================================

if "%1"=="prod" (
    echo Setting up PRODUCTION frontend environment...
    node config/setup.js production
) else if "%1"=="local" (
    echo Setting up LOCAL frontend environment...
    node config/setup.js local
) else (
    echo Setting up DEVELOPMENT frontend environment...
    node config/setup.js development
)

echo.
echo Available commands:
echo   setup.bat          - Development environment
echo   setup.bat local    - Local with backend database
echo   setup.bat prod     - Production environment
echo.
echo Ready to run: npm run dev
echo =====================================