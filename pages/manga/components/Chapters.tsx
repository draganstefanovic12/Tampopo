import { Chapter, MangaChapter } from "../[name]/[id]";
import { Dispatch, SetStateAction } from "react";

type ChapterSelectionProps = {
  props: MangaChapter;
  setChapter: Dispatch<SetStateAction<Chapter | undefined>>;
};

const Chapters = ({ props, setChapter }: ChapterSelectionProps) => {
  const handleChangeChapter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setChapter(props.chapters[Number((e.target as HTMLButtonElement).value)]);
  };

  return (
    <div className="flex flex-col-reverse w-20 rounded absolute translate-y-[400px]">
      {props.chapters.map((chapter, i) => (
        <button key={i} onClick={handleChangeChapter} value={i}>
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Chapters;
