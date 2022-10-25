import Image from "next/image";
import Link from "next/link";
import { GraphQLManga } from "../../pages/manga/types/types";

type MangaSectionProps = {
  props: GraphQLManga[];
  header?: string;
};

const MangasSection = ({ props, header }: MangaSectionProps) => {
  return (
    <section className="py-5 ml-5">
      <h1 className="text-2xl">{header}</h1>
      <ul className="flex flex-wrap gap-4">
        {props.map((manga) => (
          <li
            className="h-80 w-52 shadow-lg cursor-pointer bg-primary hover:bg-[#373845] transition-colors relative"
            key={manga.id}
          >
            <Link href={`/manga/${manga.title?.romaji}/${manga.id}`}>
              <div>
                <Image
                  src={manga.coverImage?.large!}
                  height={550}
                  objectFit="cover"
                  layout="fill"
                  unoptimized={true}
                  alt="img"
                  loader={() => manga.coverImage?.large!}
                />
                <div className="absolute bottom-0 flex flex-col backdrop-blur-lg w-52 px-1 text-[#fff] backdrop-contrast-75 main-shadow">
                  <h1 className="whitespace-nowrap overflow-ellipsis overflow-hidden font-bold">
                    {manga.title?.romaji}
                  </h1>
                  {manga.progress && (
                    <p className="main-shadow">
                      Progress: <b>{manga.progress}</b>
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MangasSection;
