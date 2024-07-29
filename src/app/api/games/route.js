import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

const SERVER_SECRET = process.env.SERVER_SECRET; // Store this in your environment variables

export async function POST(request) {
  try {
    const gameDetails = await request.json();

    const docRef = await db.collection("gameSubmissions").add(gameDetails);

    return NextResponse.json({ id: docRef.id }, { status: 200 });
  } catch (error) {
    console.error("Error saving game:", error);
    console.log("error", error);

    return NextResponse.json(
      { error: "Failed to save game details", message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    // Detail call
    try {
      const docRef = db.collection("gameSubmissions").doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        return NextResponse.json({ error: "Game not found" }, { status: 404 });
      }

      return NextResponse.json(doc.data(), { status: 200 });
    } catch (error) {
      console.error("Error fetching game details:", error);
      return NextResponse.json(
        { error: "Failed to fetch game details", message: error.message },
        { status: 500 }
      );
    }
  } else {
    // List call
    try {
      const snapshot = await db.collection("gameSubmissions").get();
      const games = [];
      snapshot.forEach((doc) => {
        games.push({ id: doc.id, ...doc.data() });
      });

      return NextResponse.json(games, { status: 200 });
    } catch (error) {
      console.error("Error fetching games list:", error);
      return NextResponse.json(
        { error: "Failed to fetch games list", message: error.message },
        { status: 500 }
      );
    }
  }
}
