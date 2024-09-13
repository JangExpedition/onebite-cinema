import styles from "./index.module.css";

import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import movies from "@/dummy.json";
import Movie from "@/components/movie-item";

export default function Home() {
  return (
    <div className={styles.container}>
      <h3>지금 가장 추천하는 영화</h3>
      <div className={styles.reco_conatiner}>
        {movies.slice(0, 3).map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
      <h3>등록된 모든 영화</h3>
      <div className={styles.all_container}>
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
