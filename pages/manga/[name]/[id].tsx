import { useUser } from "../../../features/user/context/UserContext";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { handleUpdateChapter } from "../../../api/anilistApi";
import { useMutation, useQueryClient } from "react-query";
import { GetStaticPropsContext, NextPage } from "next";
import { AnilistManga, Manga as MangaInfo, Volumes } from "../../../features/manga/types/types";
import {
  handleChapterChange,
  handleMangaChapters,
  handleMangaInfo,
} from "../../../api/mangadexApi";
import Head from "next/head";
import Chapters from "../../../features/manga/components/Chapters";
import ChapterImages from "../../../features/manga/components/ChapterImages";
import SuccessSnackbar from "../../../components/Snackbar/SuccessSnackbar";
import UpdatingSnackbar from "../../../components/Snackbar/UpdatingSnackbar";
import PreviousNextChapter from "../../../features/manga/components/PreviousNextChapter";
import { useAuth } from "../../../features/auth/context/AuthContext";

export type MangaChapter = { chapters: Chapter[] };

export type Chapter = {
  id: string;
  chapter: string;
};

const Manga: NextPage<MangaChapter> = (props: MangaChapter) => {
  const { user } = useUser();
  const { auth } = useAuth();
  const { query } = useRouter();
  const queryClient = useQueryClient();
  const [chapter, setChapter] = useState<Chapter | undefined>();
  const [updatingChapter, setUpdatingChapter] = useState<boolean>(false);
  const [successfullUpdate, setSuccessfullUpdate] = useState<boolean>(false);

  const mutateUser = useMutation(handleUpdateChapter, {
    onMutate: () => {
      setUpdatingChapter(true);
    },
    onSuccess: () => {
      //invalidates user queries on chapter mutation and refetches to keep the status synced
      queryClient.invalidateQueries("user");

      setUpdatingChapter(false);
      setSuccessfullUpdate(true);

      setTimeout(() => {
        setSuccessfullUpdate(false);
      }, 1000);
    },
  });

  //fetches all chapters for the opened manga
  const { data } = useQuery(
    ["chapter", chapter],
    () => {
      return handleChapterChange(chapter!.id);
    },
    { enabled: !!chapter, staleTime: Infinity }
  );

  const CURRENT_MANGA = user?.list.current.find(
    (manga: AnilistManga) => manga.title?.romaji === query.name
  )!;

  useEffect(() => {
    const onScroll = () => {
      //checks if a user scrolled all the way down
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const chapterUpdate = {
          id: query.id,
          progress: chapter?.chapter,
          token: auth!,
        };

        //these 2 conditions check if the manga is not read before
        //and if the last read chapter is ahead of the last current one
        //second condition is to not update the current manga with the chapters before in case of rereading
        if (!CURRENT_MANGA && user) {
          mutateUser.mutate(chapterUpdate);
        }

        if (CURRENT_MANGA && Number(chapter?.chapter) > Number(CURRENT_MANGA.progress!)) {
          mutateUser.mutate(chapterUpdate);
        }
        //removing event listener here to stop multiple requests
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [chapter]);

  return (
    <section className="flex flex-col">
      <Head>{CURRENT_MANGA && <title>{CURRENT_MANGA.title?.romaji}</title>}</Head>
      <Chapters CURRENT_CHAPTER={CURRENT_MANGA} props={props} setChapter={setChapter} />
      {data && <ChapterImages chapter={data.chapter} />}
      {data && <PreviousNextChapter props={props} setChapter={setChapter} chapter={chapter} />}
      {successfullUpdate && <SuccessSnackbar />}
      {updatingChapter && <UpdatingSnackbar />}
    </section>
  );
};

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  const { id, name } = context.params! as { id: string; name: string };

  //fetching mangas via mangadex API
  const handleManga = await handleMangaInfo(name);

  //filtering results to check if the manga with anilist ID exists
  //to know that I get the right manga to update
  const findAnilistId = handleManga.data.filter(
    (manga: MangaInfo) => manga.attributes.links && manga.attributes.links.al === id
  );

  //sending out 404 not found if theres no results
  if (handleManga.data.length === 0 || findAnilistId.length === 0) {
    return {
      notFound: true,
    };
  }

  //fetching mangas and volumes
  const handleChapters = await handleMangaChapters(findAnilistId[0] && findAnilistId[0].id);

  //looping through object keys of volumes to return them in an array
  //so i can get all chapters in one array
  const volumes = Object.keys(handleChapters.volumes).map((key: string) => {
    return handleChapters.volumes[key];
  });

  //maps through volumes array and returns an array of chapters arrays
  const handleVolumes: MangaInfo[][] = volumes.map((volumes: Volumes) => {
    return Object.keys(volumes.chapters)
      .map((chapter) => volumes.chapters[chapter])
      .filter((chapter) => !chapter.chapter.includes("."));
  }); //filters out specials or bonus chapters

  //end result is an array of arrays of objects which I can concat + apply into a single array to send back to get the total amount of chapters
  const chapters = handleVolumes.flat();

  return {
    props: { chapters: chapters },
  };
};

export default Manga;
