import axios from "axios";

const anilistApi = axios.create({
  baseURL: "https://graphql.anilist.co",
});

export const getAccessToken = async (code: string) => {
  const accessToken = await axios.post("https://anilist.co/api/v2/oauth/token", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    json: {
      grant_type: process.env.grantType,
      client_id: process.env.clientId,
      client_secret: process.env.clientSecret,
      redirect_uri: process.env.redirectURI,
      code: code,
    },
  });
  return accessToken.data;
};

export const handleFetchCurrentUser = async (token: string) => {
  const query = `
  query {
    viewer {
      id
      name
    }
  }
  `;
  const res = await anilistApi.post("/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    query: query,
  });
  return res.data;
};

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
  const res = await anilistApi.post("/", {
    query: query,
    variables: {
      page: 1,
      perPage: 25,
    },
  });
  return res.data;
};
