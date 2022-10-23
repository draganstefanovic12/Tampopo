import Image from "next/image";
import { ChapterImages as ChapterImg } from "../../pages/manga/types/types";

type ChapterImagesProps = ChapterImg;

const ChapterImages = ({ chapter }: ChapterImagesProps) => {
  return (
    <ul className="flex flex-col w-2/4 gap-10 self-center">
      {chapter.data.map((imgSource: string) => (
        <Image
          loader={() => `https://uploads.mangadex.org/data/${chapter.hash}/${imgSource}`}
          key={imgSource}
          src={`https://uploads.mangadex.org/data/${chapter.hash}/${imgSource}`}
          objectFit="cover"
          alt="manga-panel"
          width={1000}
          height={1500}
        />
      ))}
    </ul>
  );
};

export default ChapterImages;
