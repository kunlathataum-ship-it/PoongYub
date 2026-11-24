# คู่มือติดตั้ง PoongYub เวอร์ชันเว็บ (GitHub Pages)

ใช้เวลาประมาณ 30–40 นาที ทำตามลำดับ 1 → 6 ทุกขั้นฟรี ยกเว้นค่า AI ที่จ่ายตามจำนวนครั้งที่ใช้

> ไฟล์ในแพ็กนี้: `index.html` (แอป), `shim.js` (ตัวเชื่อม Firebase/Drive/AI), `config.js` (**ต้องแก้**), `plus.js`, `loy.js`, รูปและไอคอน, `off_th.json`, `sw.js` + `manifest.webmanifest` (ติดตั้งเป็นแอป), `firestore.rules` (กฎความปลอดภัย), `worker.js` (ตัวกลาง AI)

---

## 1) GitHub — วางเว็บ
1. สมัคร/ล็อกอิน https://github.com
2. มุมขวาบน **+** → **New repository** → ชื่อ `poongyub` → เลือก **Public** → **Create repository**
3. ในหน้า repo กด **uploading an existing file** → ลากไฟล์ทั้งหมดในโฟลเดอร์ `site` (ยกเว้น `worker.js` และ `SETUP.md` ไม่ต้องก็ได้) → **Commit changes**
4. **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `main` / `(root)` → **Save**
5. รอ 1–2 นาที จะได้ลิงก์ `https://<ชื่อคุณ>.github.io/poongyub/` — จดไว้ (เรียกว่า **ลิงก์แอป**)

## 2) Firebase — ล็อกอิน + ฐานข้อมูล
1. https://console.firebase.google.com → **Create a project** → ชื่อ `poongyub` (ปิด Google Analytics ได้)
2. **Build → Authentication → Get started → Sign-in method → Google → Enable** → ใส่อีเมลติดต่อ → Save
3. Authentication → **Settings → Authorized domains → Add domain** → ใส่ `<ชื่อคุณ>.github.io`
4. **Build → Firestore Database → Create database** → เลือกที่ตั้ง `asia-southeast1` (สิงคโปร์) → **Production mode**
5. แท็บ **Rules** → ลบของเดิม แล้ววางเนื้อหาไฟล์ `firestore.rules` → แก้อีเมลโค้ชถ้าไม่ใช่ `kunlathat.aum@gmail.com` → **Publish**
6. ⚙️ **Project settings → General → Your apps → ไอคอน `</>` (Web)** → ชื่อ `poongyub` → Register → จะเห็นกล่อง `firebaseConfig = { apiKey: ..., ... }` → คัดลอกค่าทั้ง 6 ตัวไปใส่ใน `config.js` ส่วน `firebase:`

## 3) Google Drive — ซิงก์ไฟล์ Health Connect
(ใช้โปรเจกต์เดียวกับ Firebase)
1. https://console.cloud.google.com → เลือกโปรเจกต์ `poongyub` (มุมซ้ายบน)
2. **APIs & Services → Library** → ค้น **Google Drive API** → **Enable**
3. **APIs & Services → OAuth consent screen** (หรือ Google Auth Platform) → User type **External** → ชื่อแอป `PoongYub`, อีเมลติดต่อ → Save
   - **Scopes/Data access** → Add → `.../auth/drive.readonly` → Save
   - **Audience / Test users** → **Add users** → ใส่อีเมล Google ของคุณและลูกค้าทุกคน (สูงสุด 100 คน)
4. **Credentials → Create credentials → OAuth client ID** → Application type **Web application**
   - **Authorized JavaScript origins** → ใส่ `https://<ชื่อคุณ>.github.io`
   - Create → คัดลอก **Client ID** ไปใส่ `googleClientId` ใน `config.js`

> สถานะ Testing: ผู้ใช้จะเห็นหน้าเตือน "Google hasn't verified this app" ให้กด **Continue** และสิทธิ์อ่าน Drive ต้องกดอนุญาตใหม่ทุก ~1 ชั่วโมง (แอปจะเด้งถามตอนกดซิงก์)

## 4) AI วิเคราะห์รูปอาหาร — Claude API + Cloudflare Worker
1. https://console.anthropic.com → **API Keys → Create Key** → คัดลอกเก็บไว้ (ใส่เครดิตใน Billing)
2. https://dash.cloudflare.com → สมัคร → **Workers & Pages → Create → Create Worker** → ชื่อ `poongyub-ai` → Deploy
3. **Edit code** → ลบของเดิม → วางทั้งไฟล์ `worker.js` → **Deploy**
4. **Settings → Variables and Secrets → Add**:
   - `ANTHROPIC_API_KEY` = คีย์จากข้อ 1 (ชนิด **Secret**)
   - `FIREBASE_PROJECT_ID` = Project ID ของ Firebase (เช่น `poongyub-1a2b3`)
   - `ALLOWED_ORIGIN` = `https://<ชื่อคุณ>.github.io`
   - (ไม่บังคับ) จำกัดจำนวนครั้ง/คน/วัน: สร้าง KV namespace ชื่อใดก็ได้ → Bindings → KV → ตัวแปร `USAGE` แล้วเพิ่ม `DAILY_LIMIT` = `20`
5. คัดลอก URL ของ Worker (เช่น `https://poongyub-ai.<ชื่อ>.workers.dev`) ไปใส่ `aiProxyUrl` ใน `config.js`

## 5) อัปโหลด config.js ที่แก้แล้ว
GitHub repo → คลิก `config.js` → ไอคอนดินสอ ✏️ → วางค่าใหม่ → **Commit changes** → รอ 1 นาที แล้วเปิด **ลิงก์แอป**

## 6) ย้ายข้อมูลจากแอปเดิม (ทำทีละโปรไฟล์)
1. แอปเดิมบน claude.ai → แท็บ **นำเข้าข้อมูล** → การ์ด **สำรอง / กู้คืนข้อมูล** → กด **คัดลอกข้อมูลทั้งหมด (JSON)**
2. แอปใหม่ → **เข้าสู่ระบบ** (มุมขวาบน) → เลือกโปรไฟล์ → แท็บ **นำเข้าข้อมูล** → วางในช่องของการ์ด **สำรอง / กู้คืนข้อมูล** → กด **กู้คืนจาก JSON ที่วางด้านล่าง**
3. ลูกค้าแต่ละคนทำเองแบบเดียวกัน แล้วกด **แชร์ข้อมูลกับโค้ช** ในแอปใหม่อีกครั้ง

## ติดตั้งเป็นแอปบนมือถือ
เปิดลิงก์แอปใน Chrome → ⋮ → **ติดตั้งแอป / เพิ่มลงในหน้าจอหลัก** → ได้ไอคอนหมู PoongYub
(iPhone: Safari → ปุ่มแชร์ → Add to Home Screen)

---
### เช็กลิสต์หลังติดตั้ง
- [ ] เข้าสู่ระบบด้วย Google แล้วป้ายมุมบนขึ้น "☁ บันทึกในบัญชีของคุณ"
- [ ] แก้โปรไฟล์ → เปิดจากอีกเครื่อง ข้อมูลตรงกัน
- [ ] แท็บนำเข้าข้อมูล → กดซิงก์ → อนุญาต Drive → นำเข้า Health Connect สำเร็จ
- [ ] บันทึกอาหาร → ถ่ายรูป → วิเคราะห์ได้
- [ ] อีเมลโค้ชเห็น "โหมดโค้ช" และรายชื่อลูกค้าที่แชร์
- [ ] ลอยกระทง → อีกบัญชีเห็นกระทงในแม่น้ำรวม
