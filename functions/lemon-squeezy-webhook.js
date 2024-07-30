const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const {
  db,
  getTemporaryGameDetails,
  removeTemporaryGameDetails,
} = require("./lib/firebase-admin");

exports.lemonSqueezyWebhook = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
      const event = req.body;

      if (event.type === "subscription_created") {
        const subscriptionId = event.data.attributes.custom_data.subscriptionId;

        // Retrieve the temporarily stored game details
        const gameDetails = await getTemporaryGameDetails(subscriptionId);

        // Save the game details
        const docRef = await db.collection("gameSubmissions").add(gameDetails);

        // Clean up temporary storage
        await removeTemporaryGameDetails(subscriptionId);

        return res.status(200).json({ success: true });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return res.status(500).json({
        error: "Failed to process webhook",
        message: error.message,
      });
    }
  });
});
