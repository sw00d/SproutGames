import { GoogleFonts } from "next-google-fonts";
import { app, analytics } from "../lib/firebase-client.js/index.js";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
