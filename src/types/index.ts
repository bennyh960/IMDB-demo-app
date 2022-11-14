export interface MovieType {
  imdbID: string;
  Year?: string;
  Type?: string;
  Title: string;
  Poster: string;
}

export interface MovieDataProps extends MovieType {
  Plot: string;
  Writer: string;
}
