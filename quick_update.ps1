# 快速版本更新腳本（預設為修補版本 patch）
# 用法: .\quick_update.ps1 "你的提交訊息"

param(
    [string]$Message = "更新遊戲內容"
)

Write-Host "🚀 快速更新模式" -ForegroundColor Cyan

# 執行版本更新
& "$PSScriptRoot\update_version.ps1" -Type patch -Message $Message

Write-Host "`n✨ 完成！" -ForegroundColor Green
