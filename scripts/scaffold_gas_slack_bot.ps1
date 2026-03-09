param(
  [Parameter(Mandatory = $true)]
  [string]$TargetRepoPath,

  [string]$BotName = "Slack Parrot Bot",
  [string]$TeamId = "T0000000000",
  [string]$ChannelId = "C0000000000",
  [string]$TimeZone = "Asia/Tokyo"
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$skillRoot = Split-Path -Parent $scriptDir
$templatesDir = Join-Path $skillRoot "assets\templates"

if (-not (Test-Path $TargetRepoPath)) {
  New-Item -ItemType Directory -Path $TargetRepoPath -Force | Out-Null
}

$replacements = @{
  "__BOT_NAME__" = $BotName
  "__DEFAULT_ALLOWED_TEAM_ID__" = $TeamId
  "__DEFAULT_ALLOWED_CHANNEL_ID__" = $ChannelId
  "__TIME_ZONE__" = $TimeZone
}

$files = @(
  "Code.js",
  "appsscript.json",
  "package.json",
  ".clasp.json.example",
  ".gitignore",
  "README.md",
  "slack-app-manifest.json"
)

foreach ($file in $files) {
  $sourcePath = Join-Path $templatesDir $file
  $targetPath = Join-Path $TargetRepoPath $file

  if (-not (Test-Path $sourcePath)) {
    throw "Template not found: $sourcePath"
  }

  $content = Get-Content -Path $sourcePath -Raw
  foreach ($key in $replacements.Keys) {
    $content = $content.Replace($key, $replacements[$key])
  }

  Set-Content -Path $targetPath -Value $content -NoNewline
  Write-Output "Wrote $targetPath"
}

Write-Output "Scaffold complete for $TargetRepoPath"
