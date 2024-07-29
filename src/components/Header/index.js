import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

// src/components/Footer.js
export default function Header() {
  return (
    <header>
      <div className="relative">
        <Image
          src="/banner.webp"
          alt="Banner"
          width={1920}
          height={445}
          className={clsx(
            "w-full object-cover",
            "h-[80px] sm:h-[90px]" // Responsive height
          )}
        />
        <div
          className={clsx(
            "absolute top-0 left-0 w-full h-full",
            "flex align-center",
            "text-white bg-black bg-opacity-50"
          )}
        >
          <div className="container flex items-center px-4">
            <Link
              href="/"
              className={clsx("font-seymour text-xl sm:text-2xl md:text-3xl")}
            >
              Sprout Games
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
