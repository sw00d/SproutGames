"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import GameTile from "@/components/GameTile";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGameDetails = async (gameId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/games`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch game details");
      }
      const data = await response.json();
      setGames(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const scrollToGameList = () => {
    const gameList = document.getElementById("game-list");
    if (gameList) {
      gameList.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchGameDetails();
  }, []);
  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <div className="relative">
        <Image
          src="/banner.webp"
          alt="Banner"
          width={1920}
          height={445}
          className={clsx(
            "w-full object-cover",
            "h-[300px] sm:h-[445px]" // Responsive height
          )}
        />
        <div
          className={clsx(
            "absolute top-0 left-0 w-full h-full",
            "flex align-center",
            "text-white bg-black bg-opacity-50"
          )}
        >
          <div className="container px-4 sm:px-8 md:px-16  flex flex-col justify-center items-start">
            <h1
              className={clsx(
                "font-seymour text-4xl sm:text-5xl md:text-6xl",
                "mb-4"
              )}
            >
              Sprout Games
            </h1>
            <p
              className={clsx(
                "font-roboto text-lg sm:text-xl md:text-2xl",
                "mb-6 max-w-md"
              )}
            >
              Discover and showcase the best indie games from talented
              developers around the world.
            </p>
            <div className="flex items-center space-x-1">
              <button
                className={clsx(
                  "bg-highlight",
                  "text-white font-bold py-2 px-10 rounded",
                  "transition duration-300"
                )}
                onClick={scrollToGameList}
              >
                Explore
              </button>

              <Link
                href="/list"
                className={clsx(
                  "hover:text-highlight",
                  "text-white font-bold py-2 px-4 rounded",
                  "transition duration-300",
                  "flex items-center",
                  "group" // Added this for hover effects on children
                )}
              >
                <span className="mr-2">List my game</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={clsx(
                    "h-5 w-5",
                    "transition-transform duration-300 ease-in-out",
                    "group-hover:translate-x-1" // This moves the SVG right on hover
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Game Tiles Section */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen"
        id="game-list"
      >
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : error ? (
          <p>Error fetching games</p>
        ) : !!games.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {games.map((game) => (
              <GameTile key={game.id} game={game} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
