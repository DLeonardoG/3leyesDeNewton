// types/comic.ts
export interface ComicPage {
  id: string;
  image: string;
  title: string;
  width?: number;
  height?: number;
}

export interface Comic {
  id: string;
  title: string;
  image: string;
  description: string;
  author?: string;
  publishedDate?: string;
  pages: ComicPage[];
  category?: string;
}