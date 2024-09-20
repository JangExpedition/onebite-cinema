import styles from "./index.module.css";

import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import Movie from "@/components/movie-item";
import { fetchMovies, fetchRamdomMovies } from "@/lib/api";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";

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
    revalidate: 3,
  };
};

export default function Home({
  allMovies,
  randomMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입씨네마</title>
        <meta property="og:image" content="/thumnail.png" />
        <meta property="og:title" content="한입씨네마" />
        <meta
          property="og:description"
          content="한입 씨네마에 등록된 영화들을 만나보세요"
        />
      </Head>
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
