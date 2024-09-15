import styles from "./index.module.css";

import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import Movie from "@/components/movie-item";
import { fetchMovies, fetchRamdomMovies } from "@/lib/api";
import { InferGetStaticPropsType } from "next";

export const getStaticProps = async () => {
  const [allMovies, randomMovies] = await Promise.all([
    await fetchMovies(),
    await fetchRamdomMovies(),
  ]);

  return {
    props: {
      allMovies,
      randomMovies,
    },
  };
};

export default function Home({
  allMovies,
  randomMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <h3>지금 가장 추천하는 영화</h3>
      <div className={styles.reco_conatiner}>
        {randomMovies.slice(0, 3).map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
      <h3>등록된 모든 영화</h3>
      <div className={styles.all_container}>
        {allMovies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
