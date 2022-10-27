import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useUserStore } from "../../../features/zustand/store";
import { useEffect, useRef, useState } from "react";
import { handleFetchSingleManga, handleUpdateChapter } from "../../../api/anilistApi";
import { Manga as MangaInfo, Volumes } from "../types/types";
import { GetStaticPropsContext, NextPage } from "next";
import {
  handleChapterChange,
  handleMangaChapters,
  handleMangaInfo,
} from "../../../api/mangadexApi";

import ChapterImages from "../components/ChapterImages";
import Chapters from "../components/Chapters";
import PreviousNextChapter from "../components/PreviousNextChapter";

export type MangaChapter = { chapters: Chapter[] };

export type Chapter = {
  id: string;
  chapter: string;
};

const Manga: NextPage<MangaChapter> = (props: MangaChapter) => {
  const { query } = useRouter();
  const { user } = useUserStore();
  const [chapter, setChapter] = useState<Chapter | undefined>();

  //fetches manga banner and basic info from ANILIST API
  const { data: mangaInfo } = useQuery(["mangaInfo"], () => {
    return handleFetchSingleManga(query.id as string);
  });

  //fetches all chapters for the opened manga
  const { data } = useQuery(
    ["chapter", chapter],
    () => {
      return handleChapterChange(chapter!.id);
    },
    { enabled: !!chapter, refetchInterval: Infinity }
  );

  useEffect(() => {
    //sets the manga to current read chapter
    const checkUserProgress = () => {
      const CHECK_PROGRESS = user?.list.current.find(
        (mangas) => mangas.title?.romaji === query.name
      )?.progress;
      CHECK_PROGRESS &&
        Number(CHECK_PROGRESS) < props.chapters.length &&
        setChapter(props.chapters[Number(CHECK_PROGRESS)]);
    };

    user && checkUserProgress();
  }, []);

  useEffect(() => {
    const onScroll = async () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const CURRENT = user?.list.current.find((manga) => manga.title?.romaji === query.name)!;
        if (Number(chapter?.chapter) > Number(CURRENT.progress!)) {
          const token = localStorage.getItem("list_auth")! as any;
          console.log("E?");
          const check = await handleUpdateChapter(CURRENT.id, chapter?.chapter, token.access_token);
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="flex flex-col">
      {mangaInfo && (
        <img className="h-[400px] object-cover" src={mangaInfo.data.Page.media[0].bannerImage} />
      )}
      <Chapters props={props} setChapter={setChapter} />
      {data && <ChapterImages chapter={data.chapter} />}
      <PreviousNextChapter props={props} setChapter={setChapter} chapter={chapter} />
    </section>
  );
};

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  const { id, name } = context.params! as { id: string; name: string };

  //fetches 10 mangas via mangadex api
  const handleManga = await handleMangaInfo(name);

  //filters the 10 results to find the id matching the anilist manga id
  const findAnilistId = handleManga.data.filter(
    (manga: MangaInfo) => manga.attributes.links && manga.attributes.links.al === id
  );

  //fetches all volumes and chapters from mangadex
  const handleChapters = await handleMangaChapters(findAnilistId[0] && findAnilistId[0].id);

  //loops through object keys of volumes and returns them in an array
  const volumes = Object.keys(handleChapters.volumes).map((key: string) => {
    return handleChapters.volumes[key];
  });

  //maps through volumes array
  const handleVolumes: MangaInfo[][] = volumes.map((volumes: Volumes) => {
    //maps through object keys of all chapters to return chapters array
    return Object.keys(volumes.chapters)
      .map((chapter) => volumes.chapters[chapter])
      .filter((chapter) => !chapter.chapter.includes("."));
  });
  //filters out specials or bonus chapters

  //end result is an array of arrays of objects which I can concat + apply into a single array to send back to get the total amount of chapters
  const chapters = handleVolumes.flat();

  return {
    props: { chapters: chapters },
  };
};

export default Manga;
