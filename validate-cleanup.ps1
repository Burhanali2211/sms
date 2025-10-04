# Validation Script to Verify Cleanup
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CLEANUP VALIDATION REPORT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$errors = 0

# Check for remaining mock files
Write-Host "🔍 Checking for mock files..." -ForegroundColor Cyan
$mockFiles = Get-ChildItem -Path "." -Recurse -Include "*mock*" -ErrorAction SilentlyContinue
if ($mockFiles.Count -eq 0) {
    Write-Host "✅ No mock files found" -ForegroundColor Green
} else {
    $mockFiles | ForEach-Object {
        Write-Host "❌ Found mock file: $($_.FullName)" -ForegroundColor Red
        $errors++
    }
}

# Check for test files
Write-Host ""
Write-Host "🔍 Checking for test files..." -ForegroundColor Cyan
$testFiles = Get-ChildItem -Path "." -Recurse -Include "*.test.*","*.spec.*" -ErrorAction SilentlyContinue
if ($testFiles.Count -eq 0) {
    Write-Host "✅ No test files found" -ForegroundColor Green
} else {
    $testFiles | ForEach-Object {
        Write-Host "❌ Found test file: $($_.FullName)" -ForegroundColor Red
        $errors++
    }
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "VALIDATION SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($errors -eq 0) {
    Write-Host "🎉 ALL CLEANUP VALIDATIONS PASSED!" -ForegroundColor Green
    Write-Host "✅ Your codebase is clean and production-ready" -ForegroundColor Green
} else {
    Write-Host "❌ $errors validation errors found" -ForegroundColor Red
    Write-Host "⚠️  Please review the issues above" -ForegroundColor Yellow
}

Write-Host "========================================" -ForegroundColor Cyan