import Image from "next/image";
import Link from "next/link";
import { AnilistManga } from "../../pages/manga/types/types";

type MangaSectionProps = {
  props: AnilistManga[];
  header?: string;
};

const MangasSection = ({ props, header }: MangaSectionProps) => {
  return (
    <section className="py-5">
      <h1 className="text-2xl">{header}</h1>
      <ul className="flex flex-wrap gap-4">
        {props.map((manga) => (
          <li
            className="h-64 w-44 shadow-lg cursor-pointer bg-primary hover:bg-[#373845] transition-transform relative hover:scale-105 overflow-hidden"
            key={manga.id}
          >
            <Link href={`/manga/${manga.title?.romaji}/${manga.id}`}>
              <div>
                <Image
                  src={manga.coverImage?.large!}
                  width={256}
                  priority
                  height={176}
                  unoptimized={true}
                  alt="img"
                  className="rounded-lg"
                />
                <div className="absolute bottom-0 translate-y-1 flex flex-col backdrop-blur-md w-44 px-1 text-[#fff] backdrop-contrast-75 main-shadow pb-1">
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
