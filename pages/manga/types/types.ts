export type Manga = {
  id: string;
  relationships: Relationship[];
  attributes: {
    links: {
      al: string;
    };
    description: {
      en: string;
    };
    title: {
      en: string;
    };
  };
};

export type AnilistManga = {
  coverImage?: {
    extraLarge: string;
    large: string;
    medium: string;
  };
  id?: number;
  title?: {
    romaji: string;
  };
  progress?: string;
};

export type Relationship = {
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
