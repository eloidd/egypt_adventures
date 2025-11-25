# 自動更新版本號腳本
# 用法: .\update_version.ps1 [major|minor|patch]
# 預設為 patch (修補版本)

param(
    [ValidateSet('major', 'minor', 'patch')]
    [string]$Type = 'patch',
    [string]$Message = ''
)

Write-Host "🔄 開始更新版本號..." -ForegroundColor Cyan

# 讀取 index.html
$indexPath = "index.html"
if (-not (Test-Path $indexPath)) {
    Write-Host "❌ 找不到 index.html 檔案" -ForegroundColor Red
    exit 1
}

$content = Get-Content $indexPath -Raw -Encoding UTF8

# 使用正則表達式匹配版本號
if ($content -match 'Version (\d+)\.(\d+)\.(\d+)') {
    $major = [int]$matches[1]
    $minor = [int]$matches[2]
    $patch = [int]$matches[3]
    
    $oldVersion = "$major.$minor.$patch"
    Write-Host "📌 目前版本: $oldVersion" -ForegroundColor Yellow
    
    # 根據類型更新版本號
    switch ($Type) {
        'major' {
            $major++
            $minor = 0
            $patch = 0
            Write-Host "⬆️  主要版本更新" -ForegroundColor Magenta
        }
        'minor' {
            $minor++
            $patch = 0
            Write-Host "⬆️  次要版本更新" -ForegroundColor Magenta
        }
        'patch' {
            $patch++
            Write-Host "⬆️  修補版本更新" -ForegroundColor Magenta
        }
    }
    
    $newVersion = "$major.$minor.$patch"
    Write-Host "✨ 新版本: $newVersion" -ForegroundColor Green
    
    # 更新 index.html 中的版本號
    $content = $content -replace "Version \d+\.\d+\.\d+", "Version $newVersion"
    $content | Set-Content $indexPath -Encoding UTF8 -NoNewline
    Write-Host "✅ 已更新 index.html" -ForegroundColor Green
    
    # 更新 main.js 中的版本號（如果有快取破壞參數）
    $mainJsPath = "main.js"
    if (Test-Path $mainJsPath) {
        # 檢查 index.html 中是否有 main.js 的版本參數
        if ($content -match 'main\.js\?v=[\w-]+') {
            $today = Get-Date -Format "yyyyMMdd"
            $content = $content -replace 'main\.js\?v=[\w-]+', "main.js?v=$today-$patch"
            $content | Set-Content $indexPath -Encoding UTF8 -NoNewline
            Write-Host "✅ 已更新 main.js 快取版本" -ForegroundColor Green
        }
    }
    
    # Git 操作
    Write-Host "`n📦 準備 Git 提交..." -ForegroundColor Cyan
    
    # 檢查是否在 git 倉庫中
    $isGitRepo = git rev-parse --is-inside-work-tree 2>$null
    if ($isGitRepo -eq "true") {
        # 添加所有變更
        git add .
        
        # 生成提交訊息
        if ([string]::IsNullOrWhiteSpace($Message)) {
            $commitMessage = "chore: 更新版本至 $newVersion"
        } else {
            $commitMessage = "$Message`n`nVersion: $newVersion"
        }
        
        # 提交
        git commit -m $commitMessage
        
        # 創建 Git 標籤
        $tagName = "v$newVersion"
        git tag -a $tagName -m "Release $newVersion"
        
        Write-Host "✅ Git 提交完成" -ForegroundColor Green
        Write-Host "🏷️  已創建標籤: $tagName" -ForegroundColor Green
        Write-Host "`n💡 提示: 使用 'git push && git push --tags' 推送到遠端" -ForegroundColor Yellow
    } else {
        Write-Host "⚠️  不在 Git 倉庫中，跳過 Git 操作" -ForegroundColor Yellow
    }
    
    Write-Host "`n🎉 版本更新完成！" -ForegroundColor Green
    Write-Host "   $oldVersion → $newVersion" -ForegroundColor Cyan
    
} else {
    Write-Host "❌ 無法在 index.html 中找到版本號格式（應為 'Version X.Y.Z'）" -ForegroundColor Red
    exit 1
}
