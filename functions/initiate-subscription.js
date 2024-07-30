const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const { storeTemporaryGameDetails } = require('./lib/firebase-admin');
const { createLemonSqueezyCheckout, generateUniqueId } = require('./lib/utils');

exports.initiateSubscription = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
      // Generate a unique identifier for this subscription attempt
      const subscriptionId = generateUniqueId();

      // Store the game details temporarily
      const gameDetails = req.body;
      await storeTemporaryGameDetails(subscriptionId, gameDetails);

      // Create a checkout URL with Lemon Squeezy API
      const checkoutUrl = await createLemonSqueezyCheckout(subscriptionId);

      return res.status(200).json({ checkoutUrl });
    } catch (error) {
      console.error("Error initiating subscription:", error);
      return res.status(500).json({
        error: "Failed to initiate subscription",
        message: error.message
      });
    }
  });
});