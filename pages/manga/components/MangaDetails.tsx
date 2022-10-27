import Image from "next/image";
import { Manga, Relationship } from "../types/types";

type MangaDetailsProps = {
  props: {
    data: Manga;
  };
};

const MangaDetails = ({ props }: MangaDetailsProps) => {
  const getCover = props.data.relationships
    .filter((findCover: Relationship) => findCover.type === "cover_art")
    .map((cover: Relationship) => cover.attributes.fileName);

  const src = `https://uploads.mangadex.org/covers/${props.data.id}/${getCover}.256.jpg`;

  return (
    <div className="px-32 gap-5 flex py-16">
      <Image
        src={src}
        alt=""
        objectFit="cover"
        unoptimized
        width={200}
        height={300}
        loader={() => src}
        className="rounded"
      />
      <div className="w-3/4">
        <h1 className="text-3xl font-bold text-white">{props.data.attributes.title.en}</h1>
        <p className="text-gray-300">{props.data.attributes.description.en}</p>
      </div>
    </div>
  );
};

export default MangaDetails;
