import { useQuery } from "react-query";
import { useState } from "react";
import { GetStaticPropsContext, NextPage } from "next";
import { Manga as MangaInfo, Volumes } from "./types/types";
import { handleChapterChange, handleMangaChapters, handleMangaInfo } from "../../api/mangadexApi";
import ChapterImages from "./components/ChapterImages";
import ChapterSelection from "./components/ChapterSelection";

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
  const name = context.params?.name as string;

  const handleManga = await handleMangaInfo(name);
  const handleChapters = await handleMangaChapters(handleManga.data[0].id);

  //loops through object keys of volumes
  const volumes = Object.keys(handleChapters.volumes).map((key: string) => {
    //and gets them back
    return handleChapters.volumes[key];
  });

  //maps through volumes
  const handleVolumes: MangaInfo[][] = volumes
    .map((volumes: Volumes) => volumes)
    //gets to single volume objects
    .map((volume: Volumes) => {
      //then gets chapter object keys and maps through them and returns an array of objects
      return Object.keys(volume.chapters).map((chapter) => volume.chapters[chapter]);
    });

  //end result is an array of arrays of objects which I can concat + apply into a single array to send back to get the total amount of chapters
  const chapters = ([] as MangaInfo[]).concat.apply([], handleVolumes);

  return {
    props: { chapters: chapters },
  };
};

export default Manga;
