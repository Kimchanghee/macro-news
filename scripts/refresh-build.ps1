# Refresh official data -> build -> publish gate. Exits non-zero on failure.
# Usage (PowerShell 7): pwsh -File scripts/refresh-build.ps1
$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
function Step($name, [scriptblock]$cmd) {
  Write-Host "== $name"
  & $cmd
  if ($LASTEXITCODE -ne 0) { Write-Error "$name failed with exit code $LASTEXITCODE"; exit $LASTEXITCODE }
}
# refresh keeps the last good snapshot per source on fetch failure and exits 0 unless every source failed.
Step 'refresh' { pnpm refresh }
Step 'build'   { pnpm build }
Step 'gate'    { pnpm gate }
Write-Host 'refresh-build OK'
exit 0
