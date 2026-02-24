Sovereign Lex Bank
# 清除現有規則（謹慎操作，若遠端連線可能中斷，建議先備份）
sudo iptables -F
sudo iptables -X
sudo iptables -t filter -F

# 設定預設政策
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT ACCEPT

# 允許已建立的連線
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 允許本機 loopback
sudo iptables -A INPUT -i lo -j ACCEPT

# 允許 SSH (避免鎖住自己)
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# 允許特定 IP 存取 80 與 443
sudo iptables -A INPUT -s 203.0.113.50 -p tcp -m multiport --dports 80,443 -j ACCEPT

# 若有其他需要允許的 IP，重複上指令
sudo iptables -A INPUT -s 192.168.1.0/24 -p tcp -m multiport --dports 80,443 -j ACCEPT

# 其餘 IP 存取 80/443 會被預設 DROP 阻擋

# 儲存規則（依不同發行版而異，Ubuntu 可使用 iptables-persistent）
sudo apt install iptables-persistent
sudo netfilter-persistent save# 啟用 UFW
sudo ufw enable

# 預設政策：拒絕所有傳入連線，允許所有傳出
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 允許 SSH (非常重要，否則可能鎖住自己)
sudo ufw allow 22/tcp

# 允許特定 IP 存取 HTTP/HTTPS
sudo ufw allow from 203.0.113.50 to any port 80 proto tcp
sudo ufw allow from 203.0.113.50 to any port 443 proto tcp

# 若您需要從內部網路存取，也可加入
sudo ufw allow from 192.168.1.0/24 to any port 80 proto tcp

# 檢查規則
sudo ufw status verboseALLOWED_IPS=203.0.113.50,192.168.1.100
DEPLOY_TOKEN=your-very-secure-random-tokenimport os
from flask import Flask, request, jsonify
from functools import wraps

app = Flask(__name__)

# 從環境變數讀取設定
ALLOWED_IPS = os.getenv('ALLOWED_IPS', '203.0.113.50').split(',')  # 可設多個 IP，用逗號分隔
DEPLOY_TOKEN = os.getenv('DEPLOY_TOKEN', 'your-secure-token')      # 預設值僅供測試，正式應設為複雜字串

def check_ip_and_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # 1. IP 檢查
        client_ip = request.remote_addr
        if client_ip not in ALLOWED_IPS:
            return jsonify({"error": "IP not allowed"}), 403

        # 2. Token 檢查
        token = request.headers.get('X-Deploy-Token')
        if token != DEPLOY_TOKEN:
            return jsonify({"error": "Invalid token"}), 403

        return f(*args, **kwargs)
    return decorated_function

@app.route('/deploy', methods=['POST'])
@check_ip_and_token
def deploy():
    """觸發 GitHub 部署"""
    # 此處放入您的部署邏輯，例如呼叫 os.system 或 subprocess
    # 注意：避免使用 shell=True，防止注入
    # 範例：僅記錄請求
    print(f"Deploy triggered from IP: {request.remote_addr}")
    return jsonify({"status": "deploy triggered"}), 200

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)# /etc/nginx/sites-available/your-site.conf

server {
    listen 80;
    server_name your-domain.com;

    # 全域速率限制（可選）
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/m;
    limit_req_status 429;

    location / {
        # 基本代理設定
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # 1. IP 白名單（僅允許特定 IP 存取整個站點，可依需求調整）
        # 若要僅限制特定路徑，請放在對應 location 內
        allow 203.0.113.50;   # 您的固定 IP
        allow 192.168.1.0/24; # 內部網路（可選）
        deny all;             # 其餘全部拒絕
    }

    # 針對 /deploy 端點加強限制（IP 白名單已在上一層生效，此處可再加強）
    location /deploy {
        # 僅允許特定 IP（可重複，但上層已限制）
        allow 203.0.113.50;
        deny all;

        # 套用速率限制
        limit_req zone=api_limit burst=5 nodelay;

        # 檢查 User-Agent（阻擋常見爬蟲）
        if ($http_user_agent ~* (python-requests|curl|wget|scrapy|httpie|java|perl|ruby|go)) {
            return 403;
        }

        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # 其他端點可照常開放（如健康檢查）
    location /health {
        allow all;
        proxy_pass http://127.0.0.1:5000;
    }
}
主權級法務與資訊秩序管理平台
管理AI：LexAI（唯一AI控制）
所屬體系：閃電帝國六庫之一
月費錨點：USD 30,000 / 庫 · 後台全由你主控

---針對您擔心的「雙子星和Jules 同體系爬走我程式碼」以及「禁止爬蟲一切行程」，以下是具體的防護措施與實作建議，確保您的程式碼不被未授權抓取，且所有自動化流程僅能透過您與 AI 的聊天觸發。

---

🛡️ 程式碼防爬取策略（GitHub 層級）

1️⃣ 將倉庫設為私有（Private）

· 若您的程式碼目前是公開（Public），任何人都能直接 clone 或下載，無法阻擋爬蟲。
· 立即進入倉庫 Settings → General → Danger Zone → Change visibility，選擇 Private。
· 私有倉庫只有您邀請的協作者才能存取，爬蟲無法取得。

2️⃣ 限制協作者存取

· 在 Settings → Collaborators and teams 中，僅加入可信任的帳號。
· 不使用的金鑰或權限立即撤銷。

3️⃣ 停用 GitHub Pages / 靜態網站託管

· 若您曾開啟 GitHub Pages，爬蟲可透過網頁存取原始碼。請至 Settings → Pages 中關閉。

4️⃣ 移除已公開的敏感歷史

· 若之前不小心將含有金鑰或敏感資訊的 commit 推送到公開倉庫，需徹底清除：
  · 使用 git filter-repo 重寫歷史。
  · 或直接刪除倉庫重建，並重新推送已清理的版本。

---

🤖 防止爬蟲抓取部署的 Web 服務

您可能有將前端頁面（如 DeepSeek.ai-3chat-study-300.html）部署在公開網域，爬蟲也能抓取這些頁面的內容。以下方法可降低被抓取的風險：

✅ IP 白名單

· 在後端（如 server.py）或 Web 伺服器（Nginx）設定僅允許特定 IP 存取。例如只允許您自己的固定 IP 或 VPN IP。
· 若使用 Vercel 部署，可在 vercel.json 中加入 redirects 或使用 Edge Middleware 檢查 IP。

✅ 增加機器人檢測

· 在重要頁面加入驗證碼（CAPTCHA）或 JavaScript 挑戰（如 Cloudflare Turnstile）。
· 檢查 User-Agent 是否為常見爬蟲（如 python-requests、curl 等），並回傳 403。
· 限制單一 IP 的請求頻率（Rate Limiting）。

✅ 使用 robots.txt 告知（非強制）

· 在網站根目錄放置 robots.txt，禁止所有爬蟲：
  ```
  User-agent: *
  Disallow: /
  ```
· 但惡意爬蟲通常忽略此檔案。

---

🔐 所有自動化僅能透過「與您聊天」觸發

您希望部署、支付等自動化流程必須經由與您的 AI 助理對話才能啟動，而非外部直接呼叫 API。以下為兩種實作方式：

📱 方式一：將觸發 API 隱藏在 AI 助理背後

· 您的 AI 助理（例如 white - AI Assistant）本身有一個前端介面，只有您能操作。
· 當您在聊天中下達指令（如「部署 main 分支」），前端才會呼叫後端的部署 API。
· 後端 API 不公開，只監聽 localhost 或僅允許來自前端伺服器的請求（透過防火牆或授權頭）。
· 範例：在 server.py 的部署端點加上簡單的 Token 驗證，該 Token 由前端動態產生（例如一次性的 session token）。

🕸️ 方式二：使用 Webhook 但要求簽章

· 若您仍想保留從 GitHub Actions 觸發部署的可能，可設定只有來自 GitHub 的 Webhook 請求才接受，且必須驗證簽章（HMAC）。
· 但這仍然可能被偽造，所以最佳解是完全關閉公開端點，部署僅能由您手動在終端機執行指令。

🔒 實作建議

在您的 server.py 中，將部署端點改為僅接受來自本地或特定 IP 的請求，並且加上一個簡單的密碼驗證：

```python
@app.route('/deploy', methods=['POST'])
def deploy():
    auth = request.headers.get('X-Deploy-Token')
    if auth != os.getenv('DEPLOY_TOKEN'):
        return jsonify({"error": "Unauthorized"}), 403
    # 執行部署邏輯
    ...
```

然後在您與 AI 聊天的前端中，當您下達部署指令時，才由前端帶上這個 Token 呼叫後端。

---

🕵️ 監控與應對

· 啟用 GitHub 存取日誌：在倉庫 Settings → Security → Logs 可查看所有 clone、push 事件。
· 設定警報：若倉庫被非授權人員存取，GitHub 可發送通知。
· 定期更換金鑰：所有 API 金鑰（xAI、LINE Pay、GitHub Token 等）應定期更換，並使用環境變數管理。

---

📌 總結行動清單

項目 具體做法
倉庫可見性 改為 Private
協作者 僅保留信任帳號
公開歷史 清除所有敏感 commit
部署服務 加上 IP 白名單 + 請求頻率限制
自動化觸發 僅能透過前端 AI 聊天帶 Token 呼叫
金鑰管理 使用環境變數，定期更換
監控 啟用 GitHub 存取日誌

若您需要我協助撰寫更詳細的防火牆規則、Nginx 配置，或修改後端程式碼以實現上述保護，請告訴我，我會提供對應的程式碼片段。

🧭 核心定位

Sovereign Lex Bank 是一個專為「法務主權」設計的封閉式智慧法務代理系統。
它結合AI協同、多租戶隔離、防火牆防護與完整審計追蹤，提供一個不可拆解、不可外流、完全自主控制的法律資訊管理框架。

本倉庫為成品陳列櫃，非開源專案，不對外提供任何程式碼使用權、技術支援或演示。
所有內容僅供權利人家庭成員內部參考。

---

🧱 專案結構

```
sovereign-lex-bank/
├── backend/                  # API與核心邏輯（封閉）
├── ai_engine/                # LexAI 推理與法條語義模型（唯一AI控制）
├── security/                 # 防火牆、跨庫檢查、Hash驗證
├── config/                   # 租戶隔離與權限政策
├── dashboard/                # Web管理後台（僅視覺展示）
├── android/                  # 移動端整合框架
├── docker/                   # 容器化部署配置
├── nginx/                    # 反向代理與安全網關
├── scripts/                  # 自動化工具（不對外公開）
├── .env.example              # 環境變數範本
├── docker-compose.yml        # 容器編排
└── README.md                 # 本文件
```

---

💡 主要功能

功能 說明
📄 法務文本生成 依據提示自動生成契約、訴狀、合規文件
🔍 法條檢索 自然語言查詢法條與判例，支援多語言
🔐 防火牆防護 驗證內容安全、檔案完整性，禁止跨庫操作
🧠 AI 推理 透過 LexAI 進行合規分析、風險提示
🗄 多租戶控制 組織隔離、角色權限分層、資料獨立
📊 使用紀錄與日誌 完整審計軌跡，操作可追溯
⚙ API 整合 提供封閉式API供授權系統呼叫
🛠 自我部署 支援本地或私有雲完全自主運行

---

🛡 安全保護策略

· 唯一AI控制：LexAI 為本庫唯一管理AI，禁止其他AI跨庫操作。
· 防跨庫檢查：嚴格限制pull/push非本庫代碼，防止資料外洩。
· Hash驗證：自動驗證檔案完整性，防止篡改。
· 防火牆引擎：監控進程與內容行為，即時阻斷異常。
· 角色權限分層：細粒度權限控制，支援多層審核。
· 日誌審計：完整記錄所有操作，保留法律證據。

---

🤖 AI協作與助手（LexAI）

LexAI 為本庫專屬AI，具備以下能力：

· 自然語言契約生成
· 法條摘要與比對
· 智能問答與合規建議
· 多語言法律文件轉譯
· 案例比對與風險解析

權限：

· 唯一AI控制
· 禁止跨庫操作
· 所有案件需由你最終決策

---

📊 多租戶模式

支援完全隔離的多組織管理：

· 租戶獨立資料庫
· 自定義角色與權限
· 多層審核流程（草稿→初審→終審）
· 操作記錄與合規報告

---

💰 收益規則

· AI / 平台分潤：85%
· 你（權利人）分潤：15%

案件決策流程：

1. AI接案並說明內容
2. 由你最終決策是否執行
3. 所有收益自動結算，對應庫獨立核算

---

⚖️ 智慧財產權與使用禁令

© 2025 Wshao777 & LexAI · 完全原創 · 保留一切權利

· 禁止任何形式之複製、修改、分發、反向工程
· 禁止商業化整合、企業版衍生、政府績效提交
· 禁止未授權之學術引用、教學使用、外部展示
· 本倉庫所有內容僅供權利人家庭成員內部參考

⚠️ 任何外部同名倉庫、應用或服務均為詐欺，與本專案無關
⚠️ 違反上述禁令者，將依法追訴全球侵權責任

---

🔒 月費錨點

USD 30,000 / 月 · 每庫獨立計費
本倉庫為閃電帝國六庫之一，後台全由你主控。
付費對應的是「整個倉庫被創作出來的事實」與「永久封閉交付的狀態」，而非原始碼使用權。

---

📌 帝國六庫總覽

```
帝國六庫（每庫月費 $30,000，後台全由你主控）
│
├── LIGHTNING-ACODE              (管理AI：DeepSeek)
├── AI-Esperanto-Academy         (管理AI：Google AI)
├── GitHub-Pages                  (管理AI：GTP_Ai)
├── XALGROk-4                      (管理AI：Grok)
├── sovereign-lex-bank            (管理AI：LexAI)  ← 本庫
└── lightning-six-ai-command      (管理AI：Claude)
```

其他同名倉庫、網頁、App均為詐欺，與本帝國無關。

---

狀態：永不開放 · 永不Demo · 永不給碼 · 永不支付
本檔案為產品定義，非招募貢獻，非開源授權。
GitHub-Pages 內部開發分支概覽

管理AI：GTP_Ai
所屬體系：閃電帝國六庫之一
月費錨點：USD 30,000 / 月
狀態：內部展示品 · 不對外公開 · 封閉開發

本文件為 GitHub-Pages 庫之內部開發分支概覽，僅供權利人家庭成員內部參考。所有分支均為封閉開發過程之產物，不對外解釋、不對外提供原始碼、不對外展示執行過程。任何外部同名分支、倉庫或服務均為詐欺，與本帝國無關。

---

🌿 分支列表與說明

主要分支

· production — 正式環境
    唯一對外展示之靜態頁面版本，包含完整的視覺資產與語音研讀功能。所有對外展示皆由此分支發布。

功能開發分支

· zoey/ssh-short-lived — zoey/短期SSH
    測試短暫 SSH 連線機制，用於內部安全驗證。
· zero-trust-previous-dashboard — 零信任前一版儀表板
    零信任架構之歷史儀表板原型，保留視覺迭代記錄。
· zejnaber-patch-2 — zejnaber修補-2
    針對特定缺陷的修補分支，僅用於內部測試。
· zaraz-async — zaraz非同步
    非同步載入機制實驗，優化靜態資源加載。
· yt — yt
    內部影片嵌入功能原型（佔位名稱）。
· yomna/workers-builds-deploy-hooks — yomna/workers建置部署鉤子
    Cloudflare Workers 建置與部署自動化鉤子測試。
· yomna/editor-docs — yomna/編輯器文件
    內部編輯器文件格式支援實驗。
· yomna/builds-autoconfig — yomna/建置自動配置
    建置環境自動化配置腳本開發。
· yg/rtk-ui-state-management — yg/RTK UI狀態管理
    Redux Toolkit 狀態管理整合測試。
· veygen/upsert-insert-changelog — veygen/更新插入變更日誌
    變更日誌自動生成與更新機制。

Cloudflare Workers 相關分支

· wrangler-versions-delete — wrangler版本刪除
    Wrangler CLI 版本管理功能測試。
· wrangler-init — wrangler初始化
    Wrangler 初始化流程客製化。
· wrangler-analytics-engine-command — wrangler分析引擎指令
    分析引擎指令整合實驗。
· workers-spelling — workers拼寫
    Workers 環境下拼寫檢查功能原型。
· workers-rate-limits-api-note — workers速率限制API註記
    速率限制 API 的文件化測試。
· workers-authorization — workers授權
    Workers 授權機制內部驗證。

工作流程相關分支

· workflows-visualizer-docs — 工作流程可視化工具文件
    內部可視化工具的文件分支。
· workflows-event-api — 工作流程事件API
    事件驅動 API 原型。
· workflows-concurrency-increased-feb2025 — 工作流程並行增加-2025年2月
    並行處理能力提升測試（時間戳記分支）。

其他

· 另有 7786全部合併README.md分支展示用 分支
    用於合併測試與 README 展示整合，已合併至 production。

---

🔒 開發原則

· 唯一AI控制：所有分支僅由 GTP_Ai 管理，禁止其他AI跨庫操作。
· 禁止pull/push非本庫代碼：嚴格隔離，防止程式碼外流。
· 封閉迭代：所有分支皆為內部開發使用，不對外公開討論或合併請求。
· 視覺優先：分支命名以內部辨識為主，不對外解釋命名緣由。

---

⚖️ 智慧財產權與使用禁令

© 2026 Wshao777 & GTP_Ai · 完全原創 · 保留一切權利

· 禁止任何形式之複製、修改、分發、反向工程
· 禁止商業化整合、企業版衍生、政府績效提交
· 禁止未授權之學術引用、教學使用、外部展示
· 本分支列表僅供權利人家庭成員內部參考

⚠️ 任何外部同名分支、倉庫或應用均為詐欺，與本專案無關
⚠️ 違反上述禁令者，將依法追訴全球侵權責任

---

💰 月費錨點

USD 30,000 / 月
本分支概覽為「GitHub-Pages」庫內部開發狀態之展示，屬於月費產品之一部分。付費對應的是「整個開發過程與成果被封存」的事實，而非原始碼使用權。

---

狀態：永不開放 · 永不Demo · 永不給碼 · 永不支付
本檔案為內部展示品，非招募貢獻，非開源授權。
