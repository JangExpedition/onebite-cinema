import stlyes from "./search.module.css";

import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import movies from "@/dummy.json";
import { MovieData } from "@/interface/movie";
import MovieItem from "@/components/movie-item";

export default function Page() {
  const q = useRouter().query.q as string;

  const filteredMovies: MovieData[] = movies.filter((movie) =>
    movie.title.includes(q)
  );

  return (
    <div className={stlyes.container}>
      {filteredMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
