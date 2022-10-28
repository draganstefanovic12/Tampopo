import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContextProvider } from "../features/user/context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
