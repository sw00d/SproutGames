"use client";

import GameOverview from "@/components/GameOverview";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";

export default function Game({ params }) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = params.id;

  useEffect(() => {
    if (id) {
      fetchGameDetails(id);
    }
  }, [id]);

  const fetchGameDetails = async (gameId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/games?id=${gameId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch game details");
      }
      const data = await response.json();
      setGame(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="mini-container px-4 py-8 text-gray-900">
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : error ? (
          <p>Error fetching game details: {error}</p>
        ) : !!game ? (
          <GameOverview game={game} />
        ) : null}
        {/* Add more game details here */}
      </div>
    </>
  );
}
