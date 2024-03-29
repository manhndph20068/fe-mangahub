export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendResponse<T> {
    statusCode: number;
    message: string;
    data?: T;
  }

  interface Subscriptions {
    id: number;
    name: string;
    image: string;
    idComic: string;
  }

  interface IBackendApiResponse {
    statusCode: number;
    message: string;
    data?: T;
  }

  interface IModelPaginate<T> {
    current_page: number;
    total_pages: number;
    comics: T[];
  }

  interface ICommics {
    id: string;
    title: string;
    thumbnail: string;
    updated_at: string;
    is_trending: boolean;
    genres: {
      id: string;
      name: string;
    }[];
    short_description: string;
    other_names: string[];
    status: string;
    total_views: number;
    followers: number;
    last_chapter: {
      id: number;
      name: string;
    };
  }

  interface IDetailComic {
    title: string;
    thumbnail: string;
    description: string;
    authors: string;
    status: string;
    genres: {
      id: string;
      name: string;
    }[];
    total_views: number;
    followers: number;
    chapters: {
      id: number;
      name: string;
    }[];
    id: string;
    other_names: string[];
  }

  interface IChapter {
    images: {
      page: number;
      src: string;
      backup_src: string;
    }[];
    chapters: {
      id: number;
      name: string;
    }[];
    chapter_name: string;
    comic_name: string;
  }

  interface IGenre {
    id: string;
    name: string;
    description: string;
  }
}
