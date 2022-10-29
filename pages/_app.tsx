import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContextProvider } from "../features/user/context/UserContext";
import { AuthContextProvider } from "../features/auth/context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/Layout";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <UserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
