// pages/api/initiate-subscription.js
import { storeTemporaryGameDetails } from "@/lib/firebase-admin";
import { createLemonSqueezyCheckout, generateUniqueId } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Generate a unique identifier for this subscription attempt
    const subscriptionId = generateUniqueId();

    // Store the game details temporarily (e.g., in a database or session)
    const gameDetails = await request.json();
    await storeTemporaryGameDetails(subscriptionId, gameDetails);

    // Create a checkout URL with Lemon Squeezy API
    const checkoutUrl = await createLemonSqueezyCheckout(subscriptionId);

    return NextResponse.json({ checkoutUrl }, { status: 200 });
  } catch (error) {
    console.error("Error initiating subscription:", error);
    return NextResponse.json(
      { error: "Failed to initiate subscription", message: error.message },
      { status: 500 }
    );
  }
}
