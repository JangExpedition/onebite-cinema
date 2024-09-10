import { useRouter } from "next/router";

export default function Search() {
  const { q } = useRouter().query;

  return <h1>검색 결과: {q}</h1>;
}
