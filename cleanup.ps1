# Comprehensive Cleanup Script for EIT SMS Project
# This script removes all test, mock, sample, and debug files from the project

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AUTOMATED CODE CLEANUP EXECUTIONER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Counter for deleted items
$deletedFiles = 0
$deletedDirs = 0

# Function to safely remove items
function SafeRemove-Item {
    param(
        [string]$Path,
        [string]$Type
    )
    
    if (Test-Path $Path) {
        try {
            Remove-Item -Recurse -Force $Path
            Write-Host "✅ Deleted $Type`: $Path" -ForegroundColor Green
            if ($Type -eq "file") {
                $deletedFiles++
            } else {
                $deletedDirs++
            }
        } catch {
            Write-Host "❌ Error deleting $Type`: $Path - $($_.Exception.Message)" -ForegroundColor Red
        }
    } else {
        Write-Host "⚠️  Not found $Type`: $Path" -ForegroundColor Yellow
    }
}

Write-Host "🔍 SCANNING FOR MOCK DATA FILES..." -ForegroundColor Cyan

# Remove mock data files
SafeRemove-Item -Path "src\utils\mockData.ts" -Type "file"

Write-Host ""
Write-Host "🔍 SCANNING FOR TEST FILES..." -ForegroundColor Cyan

# Remove test files (if any exist)
Get-ChildItem -Path "." -Recurse -Include "*.test.*","*.spec.*" -ErrorAction SilentlyContinue | ForEach-Object {
    SafeRemove-Item -Path $_.FullName -Type "file"
}

Write-Host ""
Write-Host "🔍 SCANNING FOR BUILD ARTIFACTS..." -ForegroundColor Cyan

# Remove build artifacts that exist
if (Test-Path "node_modules") {
    SafeRemove-Item -Path "node_modules" -Type "directory"
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CLEANUP SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📁 Directories deleted: $deletedDirs" -ForegroundColor Green
Write-Host "📄 Files deleted: $deletedFiles" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✨ AUTOMATED CLEANUP COMPLETE!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan