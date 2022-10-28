import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContextProvider } from "../features/user/context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/Layout";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
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
