import Image from "next/image";
import { MangaChapter } from "../[id]";

type MangaDetailsProps = {
  props: MangaChapter;
};

const MangaDetails = ({ props }: MangaDetailsProps) => {
  console.log(props);
  const getCover = props.data.relationships
    .filter((findCover) => findCover.type === "cover_art")
    .map((cover) => cover.attributes.fileName);

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
