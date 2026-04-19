$ErrorActionPreference = "Stop"

$projectRoot = "C:\Users\anasy\Downloads\GymXp-Anas\GymXp-Anas"
$androidRoot = Join-Path $projectRoot "apps\mobile\android"

$env:ANDROID_HOME = "C:\Users\anasy\AppData\Local\Android\Sdk"
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21.0.10"
$env:NODE_ENV = "production"
$env:EXPO_NO_METRO_WORKSPACE_ROOT = "1"
$env:Path += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\build-tools\36.0.0"

Push-Location $androidRoot
try {
  # Skip the library lint task because it hits a Windows file lock in node_modules.
  .\gradlew.bat assembleRelease -x lintVitalAnalyzeRelease
} finally {
  Pop-Location
}
