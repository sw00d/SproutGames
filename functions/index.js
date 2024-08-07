const functions = require("firebase-functions");
const next = require("next");
const admin = require("firebase-admin");

admin.initializeApp();

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  conf: { distDir: ".next" }, // Changed from "next" to ".next"
});
const handle = app.getRequestHandler();

exports.nextServer = functions
  .region("us-west1")
  .runWith({
    timeoutSeconds: 300,
    memory: "1GB",
  })
  .https.onRequest((req, res) => {
    console.log(`File: ${req.originalUrl}`); // Log the requested file
    return app.prepare().then(() => handle(req, res));
  });
