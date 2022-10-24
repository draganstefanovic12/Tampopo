export type Manga = {
  id: string;
  relationships: Relationship[];
  attributes: {
    description: {
      en: string;
    };
    title: {
      en: string;
    };
  };
};

export type GraphQLManga = {
  coverImage?: {
    extraLarge: string;
    large: string;
    medium: string;
  };
  id?: number;
  title?: {
    romaji: string;
  };
};

type Relationship = {
  type: string;
  attributes: {
    fileName: string;
  };
};

export type Volumes = {
  volume: string;
  count: number;
  chapters: {
    [key: string]: any;
  };
};

export type ChapterImages = {
  chapter: {
    hash: string;
    data: string[];
  };
};
