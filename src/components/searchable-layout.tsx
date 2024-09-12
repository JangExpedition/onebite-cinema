import { useRouter } from "next/router";
import styles from "./searchable-layout.module.css";

import { ReactNode, useEffect, useState } from "react";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const q = router.query.q as string;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    router.push(`/search?q=${search}`);
  };

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  return (
    <>
      <form className={styles.searchbar_container} onSubmit={onSubmit}>
        <input
          placeholder="검색어를 입력하세요..."
          value={search}
          onChange={onChangeHandler}
        />
        <button type="submit">검색</button>
      </form>
      {children}
    </>
  );
}
