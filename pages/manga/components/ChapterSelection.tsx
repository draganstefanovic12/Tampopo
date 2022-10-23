import { MangaChapter } from "../[id]";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type ChapterSelectionProps = {
  props: MangaChapter;
  setChapterId: Dispatch<SetStateAction<any>>;
};

const ChapterSelection = ({ props, setChapterId }: ChapterSelectionProps) => {
  const options = props.chapters.map((chapter, i) => (
    <option key={i} value={chapter.id}>
      {i + 1}
    </option>
  ));

  const handleChangeChapter = (e: ChangeEvent) => {
    setChapterId((e.target as HTMLInputElement).value);
  };

  return (
    <select className="fixed bottom-5 right-5 w-20 rounded" onChange={handleChangeChapter}>
      {options}
    </select>
  );
};

export default ChapterSelection;
