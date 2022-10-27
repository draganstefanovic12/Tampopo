import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { Chapter, MangaChapter } from "../[name]/[id]";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [handleNextChapter, handlePreviousChapter]);

  //doesnt display the button if on last chapter
  const checkIfLastChapter = props.chapters.at(-1)!.chapter === chapter?.chapter ? "hidden" : "";

  return (
    <div className="self-center flex gap-96">
      <button onClick={handlePreviousChapter}>Previous Chapter</button>
      <button className={`${checkIfLastChapter}`} onClick={handleNextChapter}>
        Next Chapter
      </button>
    </div>
  );
};

export default PreviousNextChapter;
