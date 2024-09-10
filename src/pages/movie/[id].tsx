import { useRouter } from "next/router";

export default function Movie() {
  const { id } = useRouter().query;
  return <h1>{id} 영화 상세 페이지</h1>;
}
