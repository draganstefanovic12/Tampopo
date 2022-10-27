import axios from "axios";
import { FetchedAnilistManga } from "../pages/manga/types/types";

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

  //puts everything in a single array of objects to return to show on screen using MangaSection component

  const splitMangasByCategory = (status: string) => {
    //splits the returned mangas into "currently reading" and "planning to read" categories
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
    id: res.data.data.Viewer.id,
    name: res.data.data.Viewer.name,
    avatar: res.data.data.Viewer.avatar.medium,
  };
};

export const handleFetchCurrentReadingMangas = async (id: string, token: string) => {
  const query = `
  query($userId:Int,$type:MediaType,$perPage:Int){
    Page(perPage:$perPage){
      mediaList(userId:$userId,type:$type,status_in:[CURRENT,REPEATING, PLANNING],sort:UPDATED_TIME_DESC){
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

  const variables = {
    id: id,
    perPage: 1,
    page: 1,
  };

  const res = await anilistApi.post("/", {
    query: query,
    variables: variables,
  });
  return res.data;
};

//fix this tmr..
export const handleUpdateChapter = async (
  id: number | undefined,
  progress: string | undefined,
  token: string
) => {
  const query = `
  mutation($mediaId: Int, $status: MediaListStatus, $progress: Int) {
    SaveMediaListEntry(mediaId: $mediaId, status: $status, progress: $progress) {
      id
      progress
    }
  }
  `;

  const variables = {
    mediaId: id,
    progress: progress,
  };

  const res = await anilistApi("/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
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
  const res = await anilistApi.post("/", {
    query: query,
    variables: {
      page: 1,
      perPage: 100,
    },
  });
  return res.data;
};
