import admin from 'firebase-admin'
import serviceAccount from './chatbot-6b78c-firebase-adminsdk-fbsvc-ac46fe40a2.json'

admin.initializeApp({
    credential  : admin.credential.cert(serviceAccount)
});

const db= admin.firestore();

export default db;