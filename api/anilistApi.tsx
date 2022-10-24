import axios from "axios";

const anilistApi = axios.create({
  baseURL: "https://graphql.anilist.co/",
});

export const handleFetchManga = async () => {
  //query for getting mangas on search
  const query = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
    media(type: MANGA, sort: FAVOURITES_DESC) {
      id
      coverImage {
        extraLarge
        large
        medium
      }
      title {
      romaji
      english
      native
      }
    type
    genres
    }
  }
}
`;
  const res = await anilistApi.post("", {
    query: query,
    variables: {
      page: 1,
      perPage: 25,
    },
  });
  return res.data;
};
