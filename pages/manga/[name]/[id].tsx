import { useQuery } from "react-query";
import { useState } from "react";
import { GetStaticPropsContext, NextPage } from "next";
import { Manga as MangaInfo, Volumes } from "../types/types";
import {
  handleChapterChange,
  handleMangaChapters,
  handleMangaInfo,
} from "../../../api/mangadexApi";
import ChapterImages from "../components/ChapterImages";
import ChapterSelection from "../components/ChapterSelection";
import Head from "next/head";

//Fetched chapter ids
type ChapterId = {
  id: string;
};

export type MangaChapter = { chapters: ChapterId[] };

const Manga: NextPage<MangaChapter> = (props: MangaChapter) => {
  const [chapterId, setChapterId] = useState<string | undefined>();
  const { data } = useQuery(
    ["chapter", chapterId],
    () => {
      return handleChapterChange(chapterId!);
    },
    { enabled: !!chapterId }
  );

  return (
    <section className="flex flex-col">
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
  const handleChapters = await handleMangaChapters(findAnilistApi[0].id);

  //loops through object keys of volumes and returns them in an array
  const volumes = Object.keys(handleChapters.volumes).map((key: string) => {
    return handleChapters.volumes[key];
  });

  //maps through volumes array
  const handleVolumes: MangaInfo[][] = volumes.map((volumes: Volumes) => {
    //maps through object keys of all chapters to return chapters array
    return Object.keys(volumes.chapters).map((chapter) => volumes.chapters[chapter]);
  });

  //end result is an array of arrays of objects which I can concat + apply into a single array to send back to get the total amount of chapters
  const chapters = handleVolumes.flat();

  return {
    props: { chapters: chapters },
  };
};

export default Manga;
