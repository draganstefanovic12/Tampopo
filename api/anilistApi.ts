import axios from "axios";
import { FetchedAnilistManga } from "../features/manga/types/types";

const anilistApi = axios.create({
  baseURL: "https://graphql.anilist.co",
});

export const getAccessToken = async (code: string) => {
  try {
    const accessToken = await axios("https://anilist.co/api/v2/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        grant_type: process.env.grantType,
        client_id: process.env.clientId,
        client_secret: process.env.clientSecret,
        redirect_uri: process.env.redirectURI,
        code: code,
      },
    });
    return accessToken.data;
  } catch (err) {
    console.log(err);
  }
};

export const refreshAccessToken = async (code: string) => {
  try {
    const accessToken = await axios("https://anilist.co/api/v2/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        grant_type: "refresh_token",
        client_id: process.env.clientId,
        client_secret: process.env.clientSecret,
        refresh_token: code,
      },
    });
    return accessToken.data;
  } catch (err) {
    console.log(err);
  }
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

  const response = await anilistApi("/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      query: query,
    },
  });

  //fetching current user name (Viewer) and id to use them as params to get all currently reading mangas
  const user = await handleFetchCurrentMangas(response.data.data.Viewer.id, token);

  //function that splits up mangas by status
  const splitMangasByCategory = (status: string) => {
    return user.data.Page.mediaList
      .filter((manga: FetchedAnilistManga) => manga.status === status)
      .map((manga: FetchedAnilistManga) => {
        return { ...manga.media, progress: manga.progress };
      });
  };

  const CURRENT = splitMangasByCategory("CURRENT");
  const PLANNING = splitMangasByCategory("PLANNING");

  return {
    list: { current: CURRENT, planning: PLANNING },
    id: response.data.data.Viewer.id,
    name: response.data.data.Viewer.name,
    avatar: response.data.data.Viewer.avatar.medium,
  };
};

export const handleFetchCurrentMangas = async (id: string, token: string) => {
  const query = `
  query($userId:Int,$type:MediaType,$perPage:Int){
    Page(perPage:$perPage){
      mediaList(userId:$userId,type:$type,status_in:[CURRENT,REPEATING, PLANNING],sort:UPDATED_TIME_DESC){
        id
        status
        progress
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

  const response = await anilistApi("/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      query: query,
      variables: variables,
    },
  });

  return response.data;
};

export const handleFetchSingleManga = async (id: string) => {
  const query = `
  query ($page: Int, $perPage: Int, $id: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
    media(type: MANGA, id: $id) {
      bannerImage
    }
  }
}
  `;

  const variables = {
    id: id,
    perPage: 1,
    page: 1,
  };

  const response = await anilistApi.post("/", {
    query: query,
    variables: variables,
  });
  return response.data;
};

type UpdatingChapter = {
  id: number | undefined;
  progress: string | undefined;
  token: string;
};

export const handleUpdateChapter = async (update: UpdatingChapter) => {
  const query = `
  mutation($mediaId: Int, $status: MediaListStatus, $progress: Int) {
    SaveMediaListEntry(mediaId: $mediaId, status: $status, progress: $progress) {
      id
      progress
    }
  }
  `;

  const variables = {
    mediaId: update.id,
    progress: update.progress,
  };

  const response = await anilistApi("/", {
    headers: {
      Authorization: `Bearer ${update.token}`,
    },
    method: "POST",
    data: {
      query: query,
      variables: variables,
    },
  });
  return response.data;
};

export const handleFetchTopRated = async () => {
  const query = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
    media(type: MANGA, sort: SCORE_DESC) {
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
  const response = await anilistApi.post("/", {
    query: query,
    variables: {
      page: 1,
      perPage: 100,
    },
  });
  return response.data;
};
