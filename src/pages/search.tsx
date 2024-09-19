import stlyes from "./search.module.css";

import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import { fetchMovies } from "@/lib/api";
import { useRouter } from "next/router";
import { MovieData } from "@/interface/movie";

export default function Page() {
  const [searchResults, setSearchResults] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q as string;

  const fetchResults = async () => {
    const movies = await fetchMovies(q);
    setSearchResults(movies);
  };

  useEffect(() => {
    if (q) {
      fetchResults();
    }
  }, [q]);

  return (
    <div className={stlyes.container}>
      {searchResults.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
