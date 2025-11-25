# 版本更新腳本使用說明

## 📝 腳本說明

### 1. `update_version.ps1` - 主要版本更新腳本

自動更新版本號並提交到 Git。

**使用方式：**

```powershell
# 修補版本更新 (1.1.11 → 1.1.12)
.\update_version.ps1

# 次要版本更新 (1.1.11 → 1.2.0)
.\update_version.ps1 -Type minor

# 主要版本更新 (1.1.11 → 2.0.0)
.\update_version.ps1 -Type major

# 帶自訂訊息
.\update_version.ps1 -Type patch -Message "修復滾動問題"
```

**功能：**
- ✅ 自動遞增版本號
- ✅ 更新 `index.html` 中的版本顯示
- ✅ 更新 `main.js` 的快取破壞參數
- ✅ 自動 Git commit
- ✅ 創建 Git 標籤 (v1.1.12)

---

### 2. `quick_update.ps1` - 快速更新腳本

一鍵完成修補版本更新。

**使用方式：**

```powershell
# 快速更新（預設訊息）
.\quick_update.ps1

# 快速更新（自訂訊息）
.\quick_update.ps1 "移除按鈕 DIV 包覆"
```

---

## 🔄 完整工作流程

### 日常更新流程：

1. **修改代碼**
   ```powershell
   # 編輯你的檔案...
   ```

2. **快速更新版本並提交**
   ```powershell
   .\quick_update.ps1 "修復手機滾動問題"
   ```

3. **推送到遠端**
   ```powershell
   git push && git push --tags
   ```

### 重大更新流程：

1. **次要版本更新**（新功能）
   ```powershell
   .\update_version.ps1 -Type minor -Message "新增黑市商人功能"
   ```

2. **主要版本更新**（重大改版）
   ```powershell
   .\update_version.ps1 -Type major -Message "遊戲架構重構"
   ```

---

## 📊 版本號規則

遵循語義化版本控制 (Semantic Versioning)：

```
主版本.次版本.修補版本
  1  .  1  .  11
  ↓     ↓     ↓
Major Minor Patch
```

- **Patch (修補版本)**：錯誤修復、小調整
- **Minor (次要版本)**：新功能、向下相容
- **Major (主要版本)**：重大改版、可能不相容

---

## 🎯 快速參考

| 操作 | 指令 |
|------|------|
| 快速更新 | `.\quick_update.ps1 "訊息"` |
| 修補更新 | `.\update_version.ps1` |
| 次要更新 | `.\update_version.ps1 -Type minor` |
| 主要更新 | `.\update_version.ps1 -Type major` |
| 推送遠端 | `git push && git push --tags` |

---

## ⚠️ 注意事項

1. 腳本會自動創建 Git 標籤
2. 記得使用 `git push --tags` 推送標籤
3. 版本號格式必須是 `Version X.Y.Z`
4. 腳本使用 UTF-8 編碼保存檔案

---

## 🔧 舊有腳本

- `bump_version.ps1` - 舊版更新腳本（已被 `update_version.ps1` 取代）
- 建議使用新腳本以獲得更好的功能
