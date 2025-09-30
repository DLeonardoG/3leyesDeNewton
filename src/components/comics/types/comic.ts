// types/comic.ts
export interface ComicPage {
  id: string;
  image: string;
  title: string;
}

export interface Comic {
  id: string;
  title: string;
  image: string;
  description: string;
  pages: ComicPage[];
}