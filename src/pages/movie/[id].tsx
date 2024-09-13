import styles from "./[id].module.css";

import { useRouter } from "next/router";
import movies from "@/dummy.json";
import { MovieData } from "@/interface/movie";

export default function Movie() {
  const id = Number(useRouter().query.id);
  const movie: MovieData = movies.filter((movie) => movie.id === id)[0];

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
