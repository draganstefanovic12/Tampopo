import { AnilistManga } from "../../../pages/manga/types/types";

export type User = {
  name: string;
  avatar: {
    medium: string;
  };
  list: AnilistManga[];
} | null;
