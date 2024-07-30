// import { randomBytes } from "crypto";
const crypto = require("crypto");
const functions = require("firebase-functions");

const env = functions.config().app;

exports.generateUniqueId = function () {
  return crypto.randomBytes(16).toString("hex");
};

exports.createLemonSqueezyCheckout = async function (
  subscriptionId,
  variantId = 123
) {
  const LEMON_SQUEEZY_API_KEY = process.env.LEMON_SQUEEZY_API_KEY;
  const LEMON_SQUEEZY_STORE_ID = process.env.LEMON_SQUEEZY_STORE_ID;

  try {
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${LEMON_SQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            store_id: LEMON_SQUEEZY_STORE_ID,
            variant_id: variantId,
            custom_price: null,
            product_options: {
              enabled: true,
            },
            checkout_options: {
              embed: false,
              media: true,
              logo: true,
              desc: true,
            },
            checkout_data: {
              custom: {
                subscriptionId: subscriptionId,
              },
            },
            expires_at: null,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.attributes.url;
  } catch (error) {
    console.error("Error creating Lemon Squeezy checkout:", error);
    throw error;
  }
};
