import axios from "axios";

const mangadexApi = axios.create({
  baseURL: "https://api.mangadex.org",
});

export const handleMangaInfo = async (query: string) => {
  const response = await mangadexApi.get("/manga", {
    params: { title: query, order: { rating: "desc" }, limit: 50 },
  });
  return response.data;
};

//fetches manga volumes and chapters
export const handleMangaChapters = async (id: string) => {
  const response = await mangadexApi.get(`/manga/${id}/aggregate?translatedLanguage%5B%5D=en`);
  return response.data;
};

//fetches chapter images
export const handleChapterChange = async (id: string) => {
  const response = await mangadexApi.get(`/at-home/server/${id}`);
  return response.data;
};
