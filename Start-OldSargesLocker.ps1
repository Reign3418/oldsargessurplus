<#
.SYNOPSIS
  Old Sarge's Surplus (240 S Bragg Blvd, Spring Lake, NC) — 1-Click Counter TV & Local Wi-Fi Sync Launcher
#>

Write-Host "=================================================================" -ForegroundColor Yellow
Write-Host " 🚁 OLD SARGE'S SURPLUS — 240 S BRAGG BLVD COUNTER & TV RIG 🚁" -ForegroundColor Yellow
Write-Host "=================================================================" -ForegroundColor Yellow

Write-Host "`n[1/2] Active Local IPv4 Addresses for Counter Phone-to-TV Sync:" -ForegroundColor Cyan
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
    $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*"
} | ForEach-Object {
    Write-Host ("    👉 Owner Phone Admin URL: http://{0}:3000/" -f $_.IPAddress) -ForegroundColor Green
    Write-Host ("    👉 1080p Counter TV URL:  http://{0}:3000/" -f $_.IPAddress) -ForegroundColor Yellow
}

Write-Host "`n[2/2] Starting Old Sarge's Surplus Local Server on Port 3000..." -ForegroundColor Cyan
Set-Location -Path $PSScriptRoot
npm.cmd run dev
