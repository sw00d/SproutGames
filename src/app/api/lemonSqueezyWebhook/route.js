// pages/api/lemon-squeezy-webhook.js
import { NextResponse } from "next/server";
import {
  db,
  getTemporaryGameDetails,
  removeTemporaryGameDetails,
} from "@/lib/firebase-admin";

export async function POST(request) {
  try {
    const event = await request.json();

    if (event.type === "subscription_created") {
      const subscriptionId = event.data.attributes.custom_data.subscriptionId;

      // Retrieve the temporarily stored game details
      const gameDetails = await getTemporaryGameDetails(subscriptionId);

      // Call your existing endpoint to save the game details
      const docRef = await db.collection("gameSubmissions").add(gameDetails);

      // Clean up temporary storage
      await removeTemporaryGameDetails(subscriptionId);

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Failed to process webhook", message: error.message },
      { status: 500 }
    );
  }
}
