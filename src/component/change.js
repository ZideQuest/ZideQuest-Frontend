import { useRouter } from "next/router";

export default function Button(path) {
  const router = useRouter();
  const handleClick = () => {
    router.push(path);
  };
  return <div></div>;
}
