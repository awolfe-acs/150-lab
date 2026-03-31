# Post-build script to copy 150-lab assets to AEM clientlib
# Run this after: npm run build

param(
    [string]$SourceDir = "dist-aem\assets",
    [string]$DestDir = "..\wso-aem-reactor\aem-6\ui.cdn\src\main\content\jcr_root\apps\acs-cdn\aem6\cdn\pages\anniversary-150"
)

Write-Host "📦 Copying 150th Anniversary assets to AEM clientlib..." -ForegroundColor Cyan

# Find the built JS and CSS files
$jsFile = Get-ChildItem -Path $SourceDir -Filter "index-*.js" | Select-Object -First 1
$cssFile = Get-ChildItem -Path $SourceDir -Filter "style-*.css" | Select-Object -First 1

if (-not $jsFile) {
    Write-Host "❌ No JS file found in $SourceDir" -ForegroundColor Red
    exit 1
}

if (-not $cssFile) {
    Write-Host "❌ No CSS file found in $SourceDir" -ForegroundColor Red
    exit 1
}

# Copy JS file and its .gz version
Copy-Item -Path $jsFile.FullName -Destination "$DestDir\js\anniversary.js" -Force
Copy-Item -Path "$($jsFile.FullName).gz" -Destination "$DestDir\js\anniversary.js.gz" -Force
Write-Host "✅ Copied $($jsFile.Name) → anniversary.js (+ .gz)" -ForegroundColor Green

# Copy CSS file and its .gz version
Copy-Item -Path $cssFile.FullName -Destination "$DestDir\css\anniversary.css" -Force
Copy-Item -Path "$($cssFile.FullName).gz" -Destination "$DestDir\css\anniversary.css.gz" -Force
Write-Host "✅ Copied $($cssFile.Name) → anniversary.css (+ .gz)" -ForegroundColor Green

# Show file sizes
$jsSize = [math]::Round((Get-Item "$DestDir\js\anniversary.js").Length / 1KB, 2)
$jsGzSize = [math]::Round((Get-Item "$DestDir\js\anniversary.js.gz").Length / 1KB, 2)
$cssSize = [math]::Round((Get-Item "$DestDir\css\anniversary.css").Length / 1KB, 2)
$cssGzSize = [math]::Round((Get-Item "$DestDir\css\anniversary.css.gz").Length / 1KB, 2)

Write-Host ""
Write-Host "📊 File Sizes:" -ForegroundColor Yellow
Write-Host "   JS:  ${jsSize} KB → ${jsGzSize} KB (gzip)" -ForegroundColor White
Write-Host "   CSS: ${cssSize} KB → ${cssGzSize} KB (gzip)" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Update your AEM page template to include:" -ForegroundColor White
Write-Host "      <sly data-sly-use.clientlib='/libs/granite/sightly/templates/clientlib.html' />" -ForegroundColor Gray
Write-Host "      <sly data-sly-call=`"`${clientlib.css @ categories='acs.anniversary-150'}`" />" -ForegroundColor Gray
Write-Host "      <sly data-sly-call=`"`${clientlib.js @ categories='acs.anniversary-150'}`" />" -ForegroundColor Gray
Write-Host ""
Write-Host "   2. Build and deploy aem-6:" -ForegroundColor White
Write-Host "      cd ..\wso-aem-reactor\aem-6" -ForegroundColor Gray
Write-Host "      mvn clean install -PautoInstallPackage" -ForegroundColor Gray
Write-Host ""
Write-Host "   3. AEM will automatically serve the .gz versions when Accept-Encoding: gzip is present" -ForegroundColor White
Write-Host ""
