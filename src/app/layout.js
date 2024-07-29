import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// Load Seymour font locally
const seymour = localFont({
  src: "../fonts/SeymourOne-Regular.ttf",
  variable: "--font-seymour",
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata = {
  title: "Sprout Games",
  description:
    "Discover and showcase the best indie games from talented developers around the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${seymour.variable} ${roboto.variable}`}>
      <body className="font-roboto flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
