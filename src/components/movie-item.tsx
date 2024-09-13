import styles from "./movie-item.module.css";

import { MovieData } from "@/interface/movie";
import Link from "next/link";

export default function MovieItem(props: MovieData) {
  return (
    <Link className={styles.container} href={`/movie/${props.id}`}>
      <img src={props.posterImgUrl} />
    </Link>
  );
}
