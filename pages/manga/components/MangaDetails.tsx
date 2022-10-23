import Image from "next/image";
import { MangaChapter } from "../[id]";

type MangaDetailsProps = {
  props: MangaChapter;
};

const MangaDetails = ({ props }: MangaDetailsProps) => {
  const getCover = props.data.relationships
    .filter((findCover) => findCover.type === "cover_art")
    .map((cover) => cover.attributes.fileName);

  const src = `https://uploads.mangadex.org/covers/${props.data.id}/${getCover}.256.jpg`;

  return (
    <div className="px-32 gap-5 flex py-16">
      <Image
        unoptimized
        src={src}
        alt=""
        objectFit="cover"
        width={150}
        height={200}
        loader={() => src}
        className="rounded"
      />
      <div>
        <h1 className="text-white text-3xl font-bold">{props.data.attributes.title.en}</h1>
      </div>
    </div>
  );
};

export default MangaDetails;
