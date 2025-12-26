import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// Read JSON file manually
const serviceAccountPath = path.resolve('./Utils/serviceKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export { admin };
