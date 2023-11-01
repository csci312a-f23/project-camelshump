/*
 * menu.js
 */
import { useRouter } from "next/router";
import MapDisplay from "@/components/MapDisplay";

export default function GameViewer() {
  const router = useRouter();
  const mapMock = [Array.from("abc"), Array.from("def"), Array.from("ghi")];

  return (
    <main>
      <MapDisplay currentMap={mapMock} />
      <button type="button" onClick={() => router.back()}>
        Quit
      </button>
    </main>
  );
}
