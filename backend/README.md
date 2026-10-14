# 求職投遞紀錄後台（PocketBase）

只有你能登入的後台，記錄投了哪些公司、職缺要求、寄出的履歷版本、對方拿到的網站版本，以及追蹤網址。
網站本身仍是靜態輸出，跟這個後台沒有任何連線。

- 系統：[PocketBase](https://github.com/pocketbase/pocketbase) v0.40.4（MIT 授權，單一執行檔，內建 SQLite 與管理介面）
- 資料表：`applications`，定義在 `pb_migrations/1760400000_create_applications.js`
- 權限：所有 API 規則都是 `null`，只有登入的管理員（superuser）讀得到、改得到；公開 API 什麼都看不到
- 登入：管理介面在 `https://<你的網域>/_/`，帳號就是 superuser；已開啟內建限流，降低密碼被暴力猜中的風險

## 欄位

| 欄位                      | 用途                                                  |
| ------------------------- | ----------------------------------------------------- |
| company、role             | 公司、職位                                            |
| status                    | 準備中／已投遞／面試中／錄取／未錄取／已婉拒          |
| appliedOn                 | 投遞日                                                |
| jobUrl、requirements      | 職缺連結、貼上的職缺要求                              |
| resumeFile                | 實際寄出的履歷 PDF（受保護檔案，要登入才拿得到）      |
| resumeVersion             | 寄連結時填 commit，例如 `3ee4a46`                     |
| siteVersion               | 寄出當下線上網站的 commit                             |
| trackingCode、trackingUrl | `pnpm utm <代碼> --note "公司 職位"` 產生的代碼和網址 |
| notes                     | 備註                                                  |

查版本：在網站專案根目錄跑 `git log -1 --format=%h -- content/resume.ts components/ResumePage.tsx`（履歷）
或 `git log -1 --format=%h`（網站），然後填進去。

## 部署到 Zeabur（第一次）

1. 在網站所在的 Zeabur 專案裡，新增服務 → Git → 選這個 repo。
2. 服務的 Settings → **Root Directory** 設為 `backend`。Zeabur 會偵測到 Dockerfile，改用 Docker 建置。
3. **Volumes** → Mount Volumes，Mount Directory 填 `/pb/pb_data`。
   沒掛載的話，每次重新部署資料都會清空。先掛載再開始記錄資料，因為掛載時目錄會被清空。
4. **Variables** 加入：
   - `PB_ADMIN_EMAIL`：你的登入信箱
   - `PB_ADMIN_PASSWORD`：長密碼（建議 20 字以上）
   - `PB_ENCRYPTION_KEY`：剛好 32 個字元的隨機字串（可用 `openssl rand -hex 16` 產生），用來加密設定檔。
     第一次部署就設定，之後不要改也不要刪，否則讀不到設定
5. **Networking** → 產生 `*.zeabur.app` 網域，或綁定自己的子網域，例如 `admin.你的網域`。
6. 部署完成後打開 `https://<網域>/_/` 登入。
7. 登入成功後，到 Variables **刪除 `PB_ADMIN_EMAIL` 和 `PB_ADMIN_PASSWORD`**，避免密碼一直留在服務設定裡。
   之後改密碼請在管理介面操作。

## 建議再做的安全設定（在管理介面）

- Settings → Backups：開啟每日自動備份。
- 想加第二道驗證：先在 Settings → Mail settings 設好 SMTP，再到 `_superusers` 這個 collection 的 Options 開啟 MFA／OTP。

## 費用

PocketBase 閒置時只用幾十 MB 記憶體。不過 Zeabur 免費方案會讓服務休眠，掛磁碟區也可能另外計費；
實際價格以 Zeabur 的方案頁面為準。

## 本機試跑

```sh
cd backend
# 先到 https://github.com/pocketbase/pocketbase/releases/tag/v0.40.4 下載 macOS 版，解壓縮放在這個資料夾
./pocketbase migrate up --dir=pb_data --migrationsDir=pb_migrations
./pocketbase superuser create you@example.com '一組長密碼'
./pocketbase serve --dir=pb_data --migrationsDir=pb_migrations
# 打開 http://127.0.0.1:8090/_/
```

`pb_data/` 已經寫進 `.gitignore`，不會被 commit。
