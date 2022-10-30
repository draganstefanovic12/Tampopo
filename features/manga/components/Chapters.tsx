import { AnilistManga } from "../types/types";
import { Chapter, MangaChapter } from "../../../pages/manga/[name]/[id]";
import { Dispatch, SetStateAction, useEffect } from "react";

type ChapterSelectionProps = {
  props: MangaChapter;
  setChapter: Dispatch<SetStateAction<Chapter | undefined>>;
  CURRENT_CHAPTER: AnilistManga;
};

const Chapters = ({ props, setChapter, CURRENT_CHAPTER }: ChapterSelectionProps) => {
  const handleChangeChapter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setChapter(props.chapters[Number((e.target as HTMLButtonElement).value)]);
  };

  useEffect(() => {
    //sets the manga to current read chapter or the first chapter
    const checkUserProgress = () => {
      CURRENT_CHAPTER && CURRENT_CHAPTER
        ? Number(CURRENT_CHAPTER.progress) < props.chapters.length &&
          setChapter(props.chapters[Number(CURRENT_CHAPTER.progress)])
        : setChapter(props.chapters[0]);
    };

    checkUserProgress();
  }, []);

  return (
    <div cy-data="chapter-div" className="flex flex-col-reverse w-20 rounded absolute">
      {props.chapters.map((chapter, i) => (
        <button key={i} onClick={handleChangeChapter} value={i}>
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Chapters;
