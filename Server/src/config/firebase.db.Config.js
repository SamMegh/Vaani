import admin from 'firebase-admin'
import fs from 'fs';

const serviceAccount = JSON.parse(
  fs.readFileSync('./src/config/chatbot-6b78c-firebase-adminsdk-fbsvc-ac46fe40a2.json', 'utf-8')
);

admin.initializeApp({
    credential  : admin.credential.cert(serviceAccount)
});

const db= admin.firestore();

export default db;