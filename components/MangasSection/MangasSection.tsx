import Image from "next/image";
import Link from "next/link";
import { Manga } from "../../pages/manga/types/types";

type MangaSectionProps = {
  props: Manga[];
};

const MangasSection = ({ props }: MangaSectionProps) => {
  //maps through props
  const mangasWithCover = props.map((manga: Manga, i) =>
    manga.relationships
      //filters covers to include cover_art
      .filter((cover) => cover.type === "cover_art")
      //then maps through everything to have "filtered" to use as image fileName source
      .map((filtered) => (
        <li
          className={`h-80 w-52  rounded shadow-lg p-1 cursor-pointer bg-primary hover:bg-[#373845] transition-colors`}
          key={i}
        >
          <Link href={`/manga/${manga.id}`}>
            <div>
              <Image
                src={`https://uploads.mangadex.org/covers/${manga.id}/${filtered.attributes.fileName}.256.jpg`}
                width={400}
                height={550}
                objectFit="cover"
                unoptimized
                alt="img"
                loader={() =>
                  `https://uploads.mangadex.org/covers/${manga.id}/${filtered.attributes.fileName}.256.jpg`
                }
              />
              <h1 className="text-white whitespace-nowrap overflow-ellipsis overflow-hidden">
                {manga.attributes.title.en}
              </h1>
            </div>
          </Link>
        </li>
      ))
  );

  return (
    <section>
      <ul className="flex flex-wrap gap-5 mt-5 ml-1.5 py-5">{mangasWithCover}</ul>
    </section>
  );
};

export default MangasSection;
