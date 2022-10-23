import axios from "axios";
import Image from "next/image";
import { Manga as CurrentManga } from "..";
import { recentlyUpdated, topRated } from "../../assets/links";

const Manga = (props: { data: CurrentManga }) => {
  const getCover = props.data.relationships
    .filter((findCover) => findCover.type === "cover_art")
    .map((cover) => cover.attributes.fileName);

  const src = `https://uploads.mangadex.org/covers/${props.data.id}/${getCover}.256.jpg`;

  return (
    <section>
      <Image src={src} alt="" objectFit="cover" width={250} height={500} loader={() => src} />
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

  return {
    props: response.data,
  };
};
