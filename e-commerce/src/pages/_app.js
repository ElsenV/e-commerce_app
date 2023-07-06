import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/state/store";
import { Caveat, Inter } from "@next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const caveat = Caveat({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />

      <Component {...pageProps} />

      <Footer />
    </Provider>
  );
}
