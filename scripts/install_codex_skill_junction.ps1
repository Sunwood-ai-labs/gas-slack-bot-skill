[CmdletBinding()]
param(
  [string]$SkillSourcePath,
  [string]$CodexHome,
  [string]$SkillName
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($SkillSourcePath)) {
  $scriptRoot = $PSScriptRoot

  if ([string]::IsNullOrWhiteSpace($scriptRoot) -and $PSCommandPath) {
    $scriptRoot = Split-Path -Parent $PSCommandPath
  }

  if ([string]::IsNullOrWhiteSpace($scriptRoot) -and $MyInvocation.MyCommand.Path) {
    $scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
  }

  if ([string]::IsNullOrWhiteSpace($scriptRoot)) {
    throw "Could not determine the script directory. Pass -SkillSourcePath explicitly."
  }

  $SkillSourcePath = Split-Path -Parent $scriptRoot
}

if ([string]::IsNullOrWhiteSpace($CodexHome)) {
  $CodexHome = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $HOME ".codex" }
}

$resolvedSource = (Resolve-Path -Path $SkillSourcePath).ProviderPath
$skillFile = Join-Path $resolvedSource "SKILL.md"

if (-not (Test-Path -Path $skillFile -PathType Leaf)) {
  throw "SKILL.md was not found under '$resolvedSource'."
}

if ([string]::IsNullOrWhiteSpace($SkillName)) {
  $nameLine = Select-String -Path $skillFile -Pattern '^name:\s*(.+?)\s*$' | Select-Object -First 1
  if ($nameLine) {
    $SkillName = $nameLine.Matches[0].Groups[1].Value.Trim().Trim("'`"")
  } else {
    $SkillName = Split-Path -Leaf $resolvedSource
  }
}

$skillsDir = Join-Path $CodexHome "skills"
$linkPath = Join-Path $skillsDir $SkillName

New-Item -ItemType Directory -Path $skillsDir -Force | Out-Null

if (Test-Path -Path $linkPath) {
  $existingItem = Get-Item -Path $linkPath -Force
  $isReparsePoint = [bool]($existingItem.Attributes -band [IO.FileAttributes]::ReparsePoint)
  $existingTarget = $null

  if ($isReparsePoint -and $existingItem.LinkType -eq "Junction" -and $existingItem.Target) {
    $existingTarget = (Resolve-Path -Path $existingItem.Target[0]).ProviderPath
  }

  if ($existingTarget -eq $resolvedSource) {
    Write-Host "Codex skill junction already exists."
    Write-Host "Name   : $SkillName"
    Write-Host "Source : $resolvedSource"
    Write-Host "Link   : $linkPath"
    exit 0
  }

  throw "A different item already exists at '$linkPath'. Remove it first or pass -SkillName with another value."
}

New-Item -ItemType Junction -Path $linkPath -Target $resolvedSource | Out-Null
$createdItem = Get-Item -Path $linkPath -Force

Write-Host "Created Codex skill junction."
Write-Host "Name   : $SkillName"
Write-Host "Source : $resolvedSource"
Write-Host "Link   : $linkPath"
Write-Host "Target : $($createdItem.Target -join ', ')"
