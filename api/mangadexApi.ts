import axios from "axios";

const mangadexApi = axios.create({
  baseURL: "https://api.mangadex.org",
});

export const handleMangaInfo = async (query: string) => {
  const res = await mangadexApi.get("/manga", {
    params: { title: query, order: { rating: "desc" }, limit: 20 },
  });
  return res.data;
};

//fetches manga volumes and chapters
export const handleMangaChapters = async (id: string) => {
  const res = await mangadexApi.get(`/manga/${id}/aggregate?translatedLanguage%5B%5D=en`);
  return res.data;
};

//fetches chapter images
export const handleChapterChange = async (id = "1") => {
  const res = await mangadexApi.get(`/at-home/server/${id}`);
  return res.data;
};
