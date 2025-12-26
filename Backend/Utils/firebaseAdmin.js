import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';


const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export { admin };
