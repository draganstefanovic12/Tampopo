import type { NextPage } from "next";
import { useAuth } from "../features/auth/context/AuthContext";
import { useUser } from "../features/user/context/UserContext";
import { AnilistManga } from "../features/manga/types/types";
import { handleFetchTopRated } from "../api/anilistApi";
import Head from "next/head";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";
import MangasSection from "../components/MangasSection/MangasSection";
import Spinner from "../components/Spinner";

type FetchedMangas = {
  manga: {
    data: {
      Page: {
        media: AnilistManga[];
      };
    };
  };
};

const Home: NextPage<FetchedMangas> = (props: FetchedMangas) => {
  const { user } = useUser();
  const { auth } = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Tampopo</title>
        <meta
          name="description"
          content="Read manga while updating your anilist progress automatically"
        />
        <link rel="icon" href="/main.svg" />
      </Head>
      <Hero />
      {auth && (
        <>
          {user ? (
            <>
              <MangasSection props={user!.list.current} header="Currently reading" />
              <MangasSection props={user!.list.planning} header="Planning to read" />
            </>
          ) : (
            <Spinner />
          )}
        </>
      )}
      <MangasSection props={props.manga.data.Page.media} header="Top rated" />
    </div>
  );
};

export const getServerSideProps = async () => {
  const mangas = await handleFetchTopRated();

  return {
    props: {
      manga: mangas,
    },
  };
};

export default Home;
