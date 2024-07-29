"use client";

// components/GameTile.js
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function GameTile({ game, disabledClick = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const [translation, setTranslation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current || !isHovered) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const maxTranslation = 5; // Maximum translation in pixels

      const translateX =
        ((e.clientX - centerX) / (rect.width / 2)) * maxTranslation;
      const translateY =
        ((e.clientY - centerY) / (rect.height / 2)) * maxTranslation;

      setTranslation({ x: translateX, y: translateY });
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  return (
    <Link
      href={disabledClick ? "" : `/games/${game.id}`}
      className="block w-full"
    >
      <div
        ref={cardRef}
        className="bg-white rounded-lg overflow-hidden shadow transition-all duration-300 ease-out"
        style={{
          transform: isHovered
            ? `translate(${translation.x}px, ${translation.y}px) scale(1.01)`
            : "translate(0px, 0px) scale(1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setTranslation({ x: 0, y: 0 });
        }}
      >
        <div className="relative h-48">
          {game.image && (
            <Image
              src={game.image}
              alt={game.title}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
        <div className="p-4 h-[115px]">
          <h2 className="text-gray-600 font-bold text-xl mb-2 truncate">
            {game.title || "[Game Title]"}
          </h2>
          <p className="text-gray-600 overflow-hidden overflow-ellipsis line-clamp-2">
            {game.description ||
              "Lorem ipsum dolor sit amet, consectetur. lorem ipsum dolor sit amet, consectetur!"}
          </p>
        </div>
      </div>
    </Link>
  );
}
