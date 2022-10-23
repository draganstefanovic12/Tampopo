import axios from "axios";

const mangadexApi = axios.create({
  baseURL: "https://api.mangadex.org",
});

//fetches manga info
export const handleMangaInfo = async (id: string) => {
  const res = await mangadexApi.get(
    `/manga/${id}?includes%5B%5D=author&includes%5B%5D=artist&includes%5B%5D=cover_art`
  );
  return res.data;
};

//fetches manga volumes and chapters
export const handleMangaChapters = async (id: string) => {
  const res = await mangadexApi.get(`/manga/${id}/aggregate?translatedLanguage%5B%5D=en`);
  return res.data;
};

//fetches chapter images
export const handleChapterChange = async (id: string) => {
  const res = await mangadexApi.get(`/at-home/server/${id}`);
  return res.data;
};

export const handleTopRated = async () => {
  const res = await mangadexApi.get(
    "/manga?includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&limit=24&contentRating%5B%5D=suggestive&order%5Brating%5D=desc&includes%5B%5D=manga&includes%5B%5D=cover_art&excludedOriginalLanguage%5B%5D=ko&excludedTags%5B%5D=5920b825-4181-4a17-beeb-9918b0ff7a30&excludedTags%5B%5D=b13b2a48-c720-44a9-9c77-39c9979373fb"
  );
  return res.data;
};

export const handleRecentlyUpdated = async () => {
  const res = await mangadexApi.get(
    "/manga?includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&limit=24&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=manga&includes%5B%5D=cover_art&excludedOriginalLanguage%5B%5D=ko&excludedOriginalLanguage%5B%5D=zh&excludedTags%5B%5D=5920b825-4181-4a17-beeb-9918b0ff7a30&excludedTags%5B%5D=b13b2a48-c720-44a9-9c77-39c9979373fb"
  );
  return res.data;
};
