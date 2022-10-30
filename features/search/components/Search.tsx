import { useQuery } from "react-query";
import { AnilistManga } from "../../manga/types/types";
import { handleSearchMangas } from "../../../api/anilistApi";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useDebounce from "../hooks/useDebounce";

const Search = () => {
  const [value, setValue] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const debouncedValue = useDebounce(value, 500);
  const { data: results } = useQuery(
    ["search", debouncedValue],
    async () => {
      return await handleSearchMangas(value);
    },
    { enabled: !!debouncedValue, refetchOnMount: false, refetchOnWindowFocus: false }
  );

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setValue("");
  };

  //using a ref to listen for clicks and to close the search results
  //if its clicked anywhere else other than input
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickAway);

    return () => {
      window.removeEventListener("click", handleClickAway);
    };
  }, [divRef]);

  return (
    <div ref={divRef}>
      <input
        value={value}
        onClick={handleOpen}
        className="bg-gray-200 rounded px-2"
        onChange={handleValue}
      />
      {isOpen && (
        <ul className="absolute z-50 bg-white w-60">
          {results &&
            results.data.Page.media.map((manga: AnilistManga, i: number) => (
              <Link
                onClick={handleClose}
                href={`/manga/${manga.title?.romaji}/${manga.id}`}
                key={i}
                className="flex hover:bg-gray-200 cursor-pointer"
              >
                <img src={manga.coverImage?.medium} className="h-full w-10 object-cover" />
                <p className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {manga.title?.romaji}
                </p>
              </Link>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
