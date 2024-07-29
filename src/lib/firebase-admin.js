import { randomBytes } from "crypto";
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const db = admin.firestore();

const storage = admin.storage();

export { db, storage, admin };

// Util functions
export async function storeTemporaryGameDetails(subscriptionId, gameDetails) {
  try {
    await db.collection("temporaryGameDetails").doc(subscriptionId).set({
      gameDetails,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error storing temporary game details:", error);
    throw error;
  }
}

export async function getTemporaryGameDetails(subscriptionId) {
  try {
    const doc = await db
      .collection("temporaryGameDetails")
      .doc(subscriptionId)
      .get();
    if (doc.exists) {
      return doc.data().gameDetails;
    } else {
      throw new Error("Temporary game details not found");
    }
  } catch (error) {
    console.error("Error getting temporary game details:", error);
    throw error;
  }
}

export async function removeTemporaryGameDetails(subscriptionId) {
  try {
    await db.collection("temporaryGameDetails").doc(subscriptionId).delete();
  } catch (error) {
    console.error("Error removing temporary game details:", error);
    throw error;
  }
}
