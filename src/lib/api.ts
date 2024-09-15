import { MovieData } from "@/interface/movie";

export async function fetchMovies(q?: string): Promise<MovieData[]> {
  let url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`;

  if (q) {
    url += `/search?q=${q}`;
  }

  const response = await fetch(url);

  try {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function fetchRamdomMovies(): Promise<MovieData[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`
  );
  try {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function fetchOneMovie(
  movieId: number
): Promise<MovieData | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`
  );

  try {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
