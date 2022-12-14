// Import the functions you need from the SDKs you need

import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
try {
  initializeApp({ credential: credential.cert(serviceAccount) });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase admin initialization error", err.stack);
  }
}

const db = getFirestore();
const storage = getStorage();

export { db, storage };
