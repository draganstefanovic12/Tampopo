import axios from "axios";

const anilistApi = axios.create({
  baseURL: "https://graphql.anilist.co",
});

export const getAccessToken = async (code: string) => {
  const accessToken = await axios("https://anilist.co/api/v2/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      json: {
        grant_type: process.env.grantType,
        client_id: process.env.clientId,
        client_secret: process.env.clientSecret,
        redirect_uri: process.env.redirectURI,
        code: code,
      },
    },
  });
  return accessToken.data;
};

export const refreshAccessToken = async (code: string) => {
  const accessToken = await axios("https://anilist.co/api/v2/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      json: {
        grant_type: "refresh_token",
        client_id: process.env.clientId,
        client_secret: process.env.clientSecret,
        refresh_token: code,
      },
    },
  });
  return accessToken;
};

export const handleFetchCurrentUser = async (token: string) => {
  const query = `
  query {
    Viewer {
      id
      name
      avatar {
        medium
      }
    }
  }
  `;
  const res = await anilistApi("/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      query: query,
    },
  });

  //fetching current viewer name and id to use them as params for all user info
  const user = await handleFetchCurrentReadingMangas(res.data.data.Viewer.id, token);
  return {
    list: user.data.Page.mediaList,
    id: res.data.data.Viewer.id,
    name: res.data.data.Viewer.name,
    avatar: res.data.data.Viewer.avatar.medium,
  };
};

export const handleFetchCurrentReadingMangas = async (id: string, token: string) => {
  const query = `
  query($userId:Int,$type:MediaType,$perPage:Int){
    Page(perPage:$perPage){
      mediaList(userId:$userId,type:$type,status_in:[CURRENT,REPEATING],sort:UPDATED_TIME_DESC){
        id
        status
        score
        progress
        progressVolumes
        media {
          id
          title {
            romaji
          }
          coverImage {
            large
          }
          }
        }
      }
    }
  `;
  const variables = {
    userId: id,
    type: "MANGA",
    perPage: 100,
  };
  const res = await anilistApi("/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      query: query,
      variables: variables,
    },
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
        large
      }
      title {
      romaji
      }
    type
    }
  }
}
`;
  const res = await anilistApi.post("/", {
    query: query,
    variables: {
      page: 1,
      perPage: 100,
    },
  });
  return res.data;
};
