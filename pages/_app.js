import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useRouter } from "next/router";
import { MetaMaskProvider } from "metamask-react";
import Meta from "../components/Meta";
import UserContext from "../components/UserContext";
import { useEffect, useRef, useState } from "react";

import PageLoader from "../components/loader";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pid = router.asPath;
  const scrollRef = useRef({
    scrollPos: 0,
  });

  const [loading, setLoading] = useState(false);

  // page loader
  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log("App is changing to: ", url)
      setLoading(true);
    };

    const handleRouteChangeComplete = (url) => {
      console.log("App is changed to: ", url)
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    }; 
  }, [router.events]);

  return (
    <>
      <Meta title="Home 1" />

      <Provider store={store}>
        <ThemeProvider enableSystem={true} attribute="class">
          <MetaMaskProvider>
            <UserContext.Provider value={{ scrollRef: scrollRef }}>
              {pid === "/login" ? (
                <Component {...pageProps} />
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </UserContext.Provider>
          </MetaMaskProvider>
        </ThemeProvider>
      </Provider>

      {loading && (
        <PageLoader />
      )}
    </>
  );
}

export default MyApp;
