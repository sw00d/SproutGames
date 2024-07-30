const admin = require("firebase-admin");
const functions = require("firebase-functions");
const env = functions.config().app;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.fb_project_id,
      clientEmail: env.fb_client_email,
      privateKey: env.fb_private_key.replace(/\\n/g, "\n"),
    }),
    storageBucket: env.fb_storage_bucket,
  });
}

const db = admin.firestore();

const storage = admin.storage();

exports.db = db;
exports.storage = storage;
exports.admin = admin;

// Util functions
exports.storeTemporaryGameDetails = async function (
  subscriptionId,
  gameDetails
) {
  try {
    await db.collection("temporaryGameDetails").doc(subscriptionId).set({
      gameDetails,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error storing temporary game details:", error);
    throw error;
  }
};

exports.getTemporaryGameDetails = async function (subscriptionId) {
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
};

exports.removeTemporaryGameDetails = async function (subscriptionId) {
  try {
    await db.collection("temporaryGameDetails").doc(subscriptionId).delete();
  } catch (error) {
    console.error("Error removing temporary game details:", error);
    throw error;
  }
};
