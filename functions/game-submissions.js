const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const { db } = require("./lib/firebase-admin");

exports.saveGame = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
      const gameDetails = req.body;
      const docRef = await db.collection("gameSubmissions").add(gameDetails);
      return res.status(200).json({ id: docRef.id });
    } catch (error) {
      console.error("Error saving game:", error);
      return res.status(500).json({
        error: "Failed to save game details",
        message: error.message,
      });
    }
  });
});

exports.getGames = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const id = req.query.id;

    if (id) {
      // Detail call
      try {
        const docRef = db.collection("gameSubmissions").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
          return res.status(404).json({ error: "Game not found" });
        }

        return res.status(200).json(doc.data());
      } catch (error) {
        console.error("Error fetching game details:", error);
        return res.status(500).json({
          error: "Failed to fetch game details",
          message: error.message,
        });
      }
    } else {
      // List call
      try {
        const snapshot = await db.collection("gameSubmissions").get();
        const games = [];
        snapshot.forEach((doc) => {
          games.push({ id: doc.id, ...doc.data() });
        });

        return res.status(200).json(games);
      } catch (error) {
        console.error("Error fetching games list:", error);
        return res.status(500).json({
          error: "Failed to fetch games list",
          message: error.message,
        });
      }
    }
  });
});
