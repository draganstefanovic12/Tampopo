import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import useLogin from "../features/user/hooks/useLogin";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const { handleLogin } = useLogin();

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  );
}

export default MyApp;
