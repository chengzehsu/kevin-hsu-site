# 求職後台的資料端（PocketBase）

網站的 `/admin/` 是你每天用的中文後台；這個資料夾是它背後的資料與登入服務，也負責「追蹤連結顯示哪一版」。
平常不需要打開 PocketBase 內建的英文管理介面（`/_/`），那只留給緊急維修。

- 系統：[PocketBase](https://github.com/pocketbase/pocketbase) v0.40.4（MIT 授權，單一執行檔，內建 SQLite）
- 資料表：`applications`（投遞）、`variants`（版本）、`owners`（後台登入帳號，只有你一個）
- 權限：兩張資料表只有 `owners` 登入後才讀得到、改得到；沒有人能自己註冊
- 公開端點只有 `GET /api/variant/{代碼}`，回傳該連結綁定版本的文案，不含公司、備註等任何私人欄位
- 已寄出的投遞鎖定：綁定的版本和追蹤代碼不能再改，版本內容也不能改（要改就複製成新版本）
- 開啟紀錄：`GET /api/stats` 由伺服器代為查詢 Umami，API 金鑰不會出現在瀏覽器

## 環境變數

| 變數                                  | 必填               | 用途                                                                                             |
| ------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------ |
| `PB_ENCRYPTION_KEY`                   | 建議               | 剛好 32 字元（`openssl rand -hex 16`），加密存在硬碟上的設定。第一次部署就設，之後不能改也不能刪 |
| `PB_ORIGINS`                          | 選填               | 允許呼叫 API 的網站網域，逗號分隔；預設 `https://chengzeresume.zeabur.app`                       |
| `UMAMI_API_KEY`                       | 要看開啟紀錄才需要 | Umami Cloud → Settings → API keys 建立                                                           |
| `UMAMI_WEBSITE_ID`                    | 選填               | 預設是網站目前用的 Umami website id                                                              |
| `PB_ADMIN_EMAIL`、`PB_ADMIN_PASSWORD` | 選填               | 只在需要緊急維修帳號（superuser）時設定，建立後刪除                                              |

網站服務那一邊要設定 `NEXT_PUBLIC_BACKEND_ORIGIN=https://<這個服務的網域>` 再重新部署；沒設的話追蹤連結的版本和 `/admin/` 都是關閉的，訪客一律看到主站。

## 部署到 Zeabur（第一次）

1. 在網站所在的 Zeabur 專案裡新增服務 → Git → 選這個 repo。
2. 服務的 Settings → **Root Directory** 設為 `backend`。Zeabur 會偵測到 Dockerfile，改用 Docker 建置。
3. **Volumes** → Mount Volumes，Mount Directory 填 `/pb/pb_data`。先掛載再開始使用，掛載時目錄會被清空；沒掛載的話每次重新部署資料都會消失。
4. **Variables** 加入上表的變數。
5. **Networking** 產生網域（例如 `*.zeabur.app`）。
6. 建立後台帳號：在服務的 Command Execution（或本機連到同一份資料）執行
   `./pocketbase owner 你的信箱 '一組 12 字以上的密碼' --dir=/pb/pb_data --hooksDir=/pb/pb_hooks`（有設 `PB_ENCRYPTION_KEY` 時加上 `--encryptionEnv=PB_ENCRYPTION_KEY`）。
   同一個指令再跑一次就是改密碼。
7. 網站服務設定 `NEXT_PUBLIC_BACKEND_ORIGIN` 後重新部署，打開 `https://<網站>/admin/` 登入。

## 本機試跑

```sh
cd backend
# 先到 https://github.com/pocketbase/pocketbase/releases/tag/v0.40.4 下載 macOS 版，解壓縮放在這個資料夾
./pocketbase migrate up --dir=pb_data --migrationsDir=pb_migrations
./pocketbase owner you@example.com '一組 12 字以上的密碼' --dir=pb_data --hooksDir=pb_hooks
./pocketbase serve --dir=pb_data --migrationsDir=pb_migrations --hooksDir=pb_hooks --origins=http://localhost:3000
```

另一個終端機在專案根目錄：

```sh
NEXT_PUBLIC_BACKEND_ORIGIN=http://127.0.0.1:8090 pnpm build && pnpm preview
# 打開 http://localhost:3000/admin/
```

`pb_data/` 和執行檔已寫進 `.gitignore`，不會被 commit。

## 費用與可用性

部署在付費方案上，服務不會休眠。PocketBase 閒置時只用幾十 MB 記憶體，磁碟區依 Zeabur 方案計費。
後台超過 1.2 秒沒回應（例如重新部署的那幾秒），網站會直接顯示主站內容，不會壞掉，只是那一次看不到客製版本。
