import { AnilistManga } from "../../manga/types/types";

export type User = {
  name: string;
  avatar: {
    medium: string;
  };
  list: {
    current: AnilistManga[];
    planning: AnilistManga[];
  };
} | null;
