import "../styles/main.scss";

import type { AppProps } from "next/app";
import Router from "next/router";
import NProgess from "nprogress";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const start = () => NProgess.start();
    const end = () => NProgess.done();

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
