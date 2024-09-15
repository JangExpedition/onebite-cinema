import stlyes from "./search.module.css";

import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { fetchMovies } from "@/lib/api";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q as string;
  const searchResults = await fetchMovies(q);

  return {
    props: {
      searchResults,
    },
  };
};

export default function Page({
  searchResults,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
