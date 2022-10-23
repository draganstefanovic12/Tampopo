import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { topRated, recentlyUpdated } from "../../assets/links";
import { Manga as CurrentManga } from "../index";

type Chapter = {
  id: string;
};

const Manga = (props: { data: CurrentManga } & { chapters: Chapter[] }) => {
  const router = useRouter();
  console.log(router);
  const getCover = props.data.relationships
    .filter((findCover) => findCover.type === "cover_art")
    .map((cover) => cover.attributes.fileName);

  const src = `https://uploads.mangadex.org/covers/${props.data.id}/${getCover}.256.jpg`;

  return (
    <section>
      <Image
        unoptimized
        src={src}
        alt=""
        objectFit="cover"
        width={250}
        height={500}
        loader={() => src}
      />
      {props.chapters.map((chapter) => (
        <Link href={`${router.asPath}/${chapter.id}`} key={chapter.id}>
          {chapter.id}
        </Link>
      ))}
    </section>
  );
};

export default Manga;

export const getStaticPaths = async () => {
  const res = await axios.get(topRated);
  const res2 = await axios.get(recentlyUpdated);

  const paths = res.data.data.map((manga: any) => {
    return {
      params: { id: manga.id.toString() },
    };
  });
  const paths2 = res2.data.data.map((manga: any) => {
    return {
      params: { id: manga.id.toString() },
    };
  });

  return {
    paths: [...paths, ...paths2],
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const response = await axios.get(
    `https://api.mangadex.org/manga/${id}?includes%5B%5D=author&includes%5B%5D=artist&includes%5B%5D=cover_art`
  );

  const getChapters = await axios.get(
    `https://api.mangadex.org/manga/${id}/aggregate?translatedLanguage%5B%5D=en`
  );

  //loops through object keys of volumes
  const volumes = Object.keys(getChapters.data.volumes).map((key: string) => {
    //and gets them back
    return getChapters.data.volumes[key];
  });

  //maps through volumes
  const handleVolumes = volumes
    .map((volumes: any) => volumes)
    //gets to single volume objects
    .map((volume: any) => {
      //then gets chapter object keys and maps through them and returns an array of objects
      return Object.keys(volume.chapters).map((chapter) => volume.chapters[chapter]);
    }) as any;

  //end result is an array of arrays of objects which I can concat + apply into a single array to send back to get the total amount of chapters
  const chapters: CurrentManga[] = [].concat.apply([], handleVolumes);

  return {
    props: { ...response.data, chapters: chapters },
  };
};
