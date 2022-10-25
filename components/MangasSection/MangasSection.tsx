import Image from "next/image";
import Link from "next/link";
import { GraphQLManga } from "../../pages/manga/types/types";

type MangaSectionProps = {
  props: GraphQLManga[];
  header?: string;
};

const MangasSection = ({ props, header }: MangaSectionProps) => {
  return (
    <section className="py-5">
      <h1 className="text-2xl">{header}</h1>
      <ul className="flex flex-wrap gap-4">
        {props.map((manga) => (
          <li
            className="h-60 w-44 shadow-lg cursor-pointer bg-primary hover:bg-[#373845] transition-all relative"
            key={manga.id}
          >
            <Link href={`/manga/${manga.title?.romaji}/${manga.id}`}>
              <div>
                <Image
                  src={manga.coverImage?.large!}
                  height={275}
                  width={200}
                  objectFit="cover"
                  unoptimized={true}
                  alt="img"
                  className="rounded-lg"
                  loader={() => manga.coverImage?.large!}
                />
                <div className="absolute bottom-0 translate-y-1 flex flex-col backdrop-blur-md w-44 px-1 text-[#fff] backdrop-contrast-75 main-shadow">
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
