import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function POST(request) {
  try {
    const gameDetails = await request.json();
    console.log("firing", gameDetails);

    const docRef = await db.collection("gameSubmissions").add(gameDetails);

    return NextResponse.json({ id: "docRef.id" }, { status: 200 });
  } catch (error) {
    console.error("Error saving game:", error);
    console.log("error", error);

    return NextResponse.json(
      { error: "Failed to save game details", message: error.message },
      { status: 500 }
    );
  }
}
