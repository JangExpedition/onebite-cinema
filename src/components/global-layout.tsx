import styles from "./global-layout.module.css";

import Link from "next/link";
import { ReactNode } from "react";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <header>
        <Link href={"/"}>ONEBITE CINEMA</Link>
      </header>
      {children}
    </div>
  );
}
