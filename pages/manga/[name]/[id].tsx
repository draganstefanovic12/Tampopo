import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useUserStore } from "../../../features/zustand/store";
import { useEffect, useState } from "react";
import { handleFetchSingleManga } from "../../../api/anilistApi";
import { Manga as MangaInfo, Volumes } from "../types/types";
import { GetStaticPropsContext, NextPage } from "next";
import {
  handleChapterChange,
  handleMangaChapters,
  handleMangaInfo,
} from "../../../api/mangadexApi";

import ChapterImages from "../components/ChapterImages";
import ChapterSelection from "../components/ChapterSelection";

//Fetched chapter ids
type ChapterId = {
  id: string;
};

export type MangaChapter = { chapters: ChapterId[] };

const Manga: NextPage<MangaChapter> = (props: MangaChapter) => {
  const { query } = useRouter();
  const { user } = useUserStore();
  const [chapterId, setChapterId] = useState<string | undefined>();

  const { data: mangaInfo } = useQuery(["mangaInfo"], () => {
    return handleFetchSingleManga(query.id as string);
  });

  const { data } = useQuery(
    ["chapter", chapterId],
    () => {
      return handleChapterChange(chapterId!);
    },
    { enabled: !!chapterId }
  );

  useEffect(() => {
    //sets the manga to current read chapter
    const CHECK_PROGRESS = user?.list.current.find(
      (mangas) => mangas.title?.romaji === query.name
    )?.progress;
    CHECK_PROGRESS &&
      Number(CHECK_PROGRESS) < props.chapters.length &&
      setChapterId(props.chapters[Number(CHECK_PROGRESS)].id);
  }, []);

  return (
    <section className="flex flex-col">
      {mangaInfo && <img className="h-1/4 " src={mangaInfo.data.Page.media[0].bannerImage} />}
      <ChapterSelection props={props} setChapterId={setChapterId} />
      {data && <ChapterImages chapter={data.chapter} />}
    </section>
  );
};

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  const { id, name } = context.params! as { id: string; name: string };

  //fetches 10 mangas via mangadex api
  const handleManga = await handleMangaInfo(name);

  //filters the 10 results to find the id matching the anilist manga id
  const findAnilistApi = handleManga.data.filter(
    (manga: MangaInfo) => manga.attributes.links && manga.attributes.links.al === id
  );

  //fetches all volumes and chapters from mangadex
  const handleChapters = await handleMangaChapters(findAnilistApi[0] && findAnilistApi[0].id);

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
