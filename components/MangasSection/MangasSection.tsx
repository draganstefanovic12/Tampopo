import Image from "next/image";
import Link from "next/link";
import { GraphQLManga } from "../../pages/manga/types/types";

type MangaSectionProps = {
  props: GraphQLManga[];
};

const MangasSection = ({ props }: MangaSectionProps) => {
  return (
    <section>
      <ul className="flex flex-wrap gap-5 mt-5 ml-1.5 py-5">
        {props.map((manga) => (
          <li
            className="h-80 w-52  rounded shadow-lg p-1 cursor-pointer bg-primary hover:bg-[#373845] transition-colors"
            key={manga.id}
          >
            <Link href={`/manga/${manga.title?.romaji}`}>
              <div>
                <Image
                  src={manga.coverImage?.large!}
                  width={400}
                  height={550}
                  objectFit="cover"
                  unoptimized
                  alt="img"
                  loader={() => manga.coverImage?.large!}
                />
                <h1 className="text-white whitespace-nowrap overflow-ellipsis overflow-hidden">
                  {manga.title?.romaji}
                </h1>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MangasSection;
