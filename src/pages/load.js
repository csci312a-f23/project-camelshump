import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styles from "../styles/Load.module.css";

export default function LoadGame({ setCurrentId }) {
  const router = useRouter();
  const { data: session } = useSession({ required: true }); // eslint-disable-line no-unused-vars
  const [games, setGames] = useState([]);

  // Fetch the list of games when the component mounts
  useEffect(() => {
    fetch(`/api/games?userid=${session.user.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        setGames(response);
      })
      .catch((err) => console.log(err)); // eslint-disable-line no-console
  }, [session.user.id]);

  const handleGameClick = (gameId) => {
    setCurrentId(gameId);
    router.push("/play");
  };

  // eslint-disable-next-line no-unused-vars
  const handleDelete = (gameId) => {};

  return (
    <main className="game-selection-container">
      <h1>Select a Game</h1>
      <ul className={styles.button_list}>
        {games.map((game) => (
          <li key={game.id}>
            <button type="button" onClick={() => handleGameClick(game.id)}>
              {game.title}
            </button>
            <div className={styles.selector}>
              <button type="button">Rename</button>
              <button type="button" onClick={() => handleDelete(game.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

LoadGame.propTypes = {
  setCurrentId: PropTypes.func.isRequired,
};
