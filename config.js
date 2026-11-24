// ===== ตั้งค่า PoongYub เวอร์ชันเว็บ =====
// คัดลอกค่าจาก Firebase Console → Project settings → Your apps → Web app (SDK setup and configuration)
window.PY_CONFIG = {
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT.firebaseapp.com',
    projectId: 'YOUR_PROJECT',
    storageBucket: 'YOUR_PROJECT.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
  },
  // อีเมล Google ของโค้ช (เห็นข้อมูลลูกค้าที่แชร์ + ฟีเจอร์พิเศษ) — ต้องตรงกับใน firestore.rules
  coachEmails: ['kunlathat.aum@gmail.com'],
  // Google Cloud → APIs & Services → Credentials → OAuth client ID (Web application)
  googleClientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
  // URL ของ Cloudflare Worker ที่ส่งต่อไปยัง Claude API (เว้นว่าง = ปิด AI วิเคราะห์รูปอาหาร)
  aiProxyUrl: 'https://YOUR_WORKER.workers.dev',
  aiModel: 'claude-sonnet-5-5',
};
