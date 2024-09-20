import stlyes from "./search.module.css";

import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import { fetchMovies } from "@/lib/api";
import { useRouter } from "next/router";
import { MovieData } from "@/interface/movie";
import Head from "next/head";

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
    <>
      <Head>
        <title>한입씨네마 - 검색결과</title>
        <meta property="og:image" content="/thumnail.png" />
        <meta property="og:title" content="한입씨네마" />
        <meta
          property="og:description"
          content="한입 씨네마에 등록된 영화들을 만나보세요"
        />
      </Head>
      <div className={stlyes.container}>
        {searchResults.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
