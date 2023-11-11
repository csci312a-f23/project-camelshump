/*
 * menu.js
 */
import { useRouter } from "next/router";

export default function ClassSelector() {
  const router = useRouter();

  const classChoice = () => {
    router.push("/play");
  };

  return (
    <main>
      {" "}
      <ClassSelector classChoice={classChoice} />
    </main>
  );
}
