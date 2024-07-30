const functions = require("firebase-functions");

exports.initiateSubscription =
  require("./initiate-subscription").initiateSubscription;

exports.lemonSqueezyWebhook =
  require("./lemon-squeezy-webhook").lemonSqueezyWebhook;

exports.saveGame = require("./game-submissions").saveGame;
exports.getGames = require("./game-submissions").getGames;
