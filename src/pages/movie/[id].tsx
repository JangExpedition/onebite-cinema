import styles from "./[id].module.css";

import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { fetchOneMovie } from "@/lib/api";
import { useRouter } from "next/router";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
};

export default function Movie({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  if (router.isFallback) return "로딩중입니다.";
  if (!movie) return <div>존재하지 않는 영화입니다.</div>;

  return (
    <div className={styles.container}>
      <div
        className={styles.cover_img_container}
        style={{ backgroundImage: `url('${movie.posterImgUrl}')` }}
      >
        <img src={movie.posterImgUrl} />
      </div>

      <div className={styles.info_container}>
        <div>
          <h2>{movie.title}</h2>
          <div>
            {movie.releaseDate} / {movie.genres.join(", ")} / {movie.runtime}분
          </div>
          <div>{movie.company}</div>
        </div>

        <div>
          <div className={styles.subTitle}>{movie.subTitle}</div>
          <div className={styles.description}>{movie.description}</div>
        </div>
      </div>
    </div>
  );
}
