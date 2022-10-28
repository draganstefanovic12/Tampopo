import { MangaChapter, Chapter } from "../../../pages/manga/[name]/[id]";
import { Dispatch, SetStateAction } from "react";

type PreviousNextProps = {
  props: MangaChapter;
  setChapter: Dispatch<SetStateAction<Chapter | undefined>>;
  chapter: Chapter | undefined;
};

const PreviousNextChapter = ({ props, setChapter, chapter }: PreviousNextProps) => {
  const handleNextChapter = () => {
    setChapter((currChapter: Chapter | undefined) => props.chapters[Number(currChapter?.chapter)]);
  };

  const handlePreviousChapter = () => {
    setChapter(
      (currChapter: Chapter | undefined) => props.chapters[Number(currChapter?.chapter) - 2]
    );
  };

  //doesnt display the button if on last chapter
  const checkIfLastChapter = props.chapters.at(-1)!.chapter === chapter?.chapter ? "hidden" : "";

  return (
    <div className="self-center flex gap-[1400px]">
      <button onClick={handlePreviousChapter}>Previous Chapter</button>
      <button className={checkIfLastChapter} onClick={handleNextChapter}>
        Next Chapter
      </button>
    </div>
  );
};

export default PreviousNextChapter;
