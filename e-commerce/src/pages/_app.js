import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/state/store";
import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Wardrope</title>
        <meta
          name="description"
          content="jewelleries and clothes for fair price"
          key="desc"
        />
      </Head>
      <Navbar />

      <Component {...pageProps} />

      <Footer />
    </Provider>
  );
}
