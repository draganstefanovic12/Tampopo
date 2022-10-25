import { GraphQLManga } from "../../../pages/manga/types/types";

export type User = {
  name: string;
  avatar: {
    medium: string;
  };
  list: GraphQLManga[];
} | null;
