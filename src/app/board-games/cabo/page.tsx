"use client";
import { Button } from "@/components/button/Button";
import React, { useEffect, useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaPlaneArrival } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";

type CaboPlayer = {
  name: string;
  score: number;
};

type CaboData = {
  players: CaboPlayer[];
};

export default function CaboPage() {
  const [players, setPlayers] = useState<CaboPlayer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState<CaboPlayer | null>(null);
  const [playerNameEmpty, setPlayerNameEmpty] = useState(false);

  useEffect(() => {
    // create the cabo object in local storage if it doesn't exist
    if (!localStorage?.getItem("cabo")) {
      localStorage?.setItem("cabo", JSON.stringify({ players: [] }));
    }

    // get the cabo object from local storage
    const caboData = JSON.parse(
      localStorage?.getItem("cabo") as string
    ) as CaboData;

    // set the players in state
    setPlayers(caboData.players);
  }, []);

  useEffect(() => {
    // Check if any player's score is above 100 and display the modal
    const playerOver100 = players.some((player) => player.score > 100);
    if (playerOver100) {
      // Find the player with the smallest score
      const winner = players.reduce((prev, current) =>
        prev.score < current.score ? prev : current
      );
      setWinner(winner);
      setShowModal(true);
    }
  }, [players]);

  const addPlayer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const playerName = formData.get("playerName") as string;

    if (!playerName) {
      setPlayerNameEmpty(true);
      return;
    }

    // get the cabo object from local storage
    const caboData = JSON.parse(
      localStorage?.getItem("cabo") as string
    ) as CaboData;

    // add the player to the players array
    caboData.players.push({ name: playerName, score: 0 });

    // update the players in local storage
    localStorage?.setItem("cabo", JSON.stringify(caboData));

    // update the players in state
    setPlayers(caboData.players);

    // clear the form
    form.reset();
    playerNameEmpty && setPlayerNameEmpty(false);
  };

  const resetGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // get the cabo object from local storage
    const caboData = JSON.parse(
      localStorage?.getItem("cabo") as string
    ) as CaboData;

    // reset the list of players
    caboData.players = [];

    // update the players in local storage
    localStorage?.setItem("cabo", JSON.stringify(caboData));

    // update the players in state
    setPlayers(caboData.players);
  };

  const resetScores = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // get the cabo object from local storage
    const caboData = JSON.parse(
      localStorage?.getItem("cabo") as string
    ) as CaboData;

    // reset the scores of all the players
    caboData.players.forEach((player) => {
      player.score = 0;
    });

    // update the players in local storage
    localStorage?.setItem("cabo", JSON.stringify(caboData));

    // update the players in state
    setPlayers(caboData.players);
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl">Cabo</h1>
      <p className="m-5 text-xl">
        Cabo is a card game that is played with a standard deck of 52 cards. The
        goal of the game is to have the lowest score at the end of the game.
      </p>
      {/* explain what each icon does */}
      <h2 className="text-3xl p-5">Icons </h2>
      <div className="flex justify-around items-center p-5 flex-wrap">
        <div className="flex flex-col items-center">
          <CiCirclePlus size={40} />
          <p>Add 1 to the player's score</p>
        </div>
        <div className="flex flex-col items-center">
          <CiCircleMinus size={40} />
          <p>Subtract 1 from the player's score</p>
        </div>
        <div className="flex flex-col items-center">
          <FaPlaneArrival size={40} />
          <p>Add 50 to all the other players' scores</p>
        </div>
        <div className="flex flex-col items-center">
          <VscDebugRestart size={40} />
          {/* this one changes the score of that player back to 50 */}
          <p>Reset player's score to 50</p>
        </div>
      </div>
      <div className="flex justify-around items-center">
        <form
          action=""
          className="flex justify-evenly w-1/3 m-3 items-center"
          onSubmit={addPlayer}
        >
          <input
            type="text"
            className="w-1/2 bg-slate-200 text-black p-3 rounded-2xl"
            placeholder="Enter player name"
            name="playerName"
          />
          <Button buttonText="Add Player" classes="w-1/2" type={"submit"} />
        </form>
        <div className="flex items-center">
          <form action="" onSubmit={resetGame}>
            <Button buttonText="Restart Game" type={"submit"} />
          </form>
          <form action="" onSubmit={resetScores}>
            <Button buttonText="Restart Scores" type={"submit"} />
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <table className="m-5 w-1/2">
          <thead>
            <tr className="">
              <th className="m-1">Player</th>
              <th className="m-1">Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {players.map((player, index) => (
              <tr key={index} className="text-center align-middle">
                <td className="w-1/3">{player.name}</td>
                <td className="w-1/3">{player.score}</td>
                <td className="w-1/3 flex">
                  <button
                    onClick={() => {
                      player.score += 1;
                      const caboData = JSON.parse(
                        localStorage?.getItem("cabo") as string
                      ) as CaboData;
                      caboData.players[index] = player;
                      localStorage?.setItem("cabo", JSON.stringify(caboData));
                      setPlayers(caboData.players);
                    }}
                    className="m-1"
                  >
                    <CiCirclePlus size={40} />
                  </button>
                  <button
                    onClick={() => {
                      player.score -= 1;
                      const caboData = JSON.parse(
                        localStorage?.getItem("cabo") as string
                      ) as CaboData;
                      caboData.players[index] = player;
                      localStorage?.setItem("cabo", JSON.stringify(caboData));
                      setPlayers(caboData.players);
                    }}
                    className="m-1"
                  >
                    <CiCircleMinus size={40} />
                  </button>
                  <button
                    onClick={() => {
                      // kamikaze adds +50 to all the other players but not to the player who clicked the button
                      const caboData = JSON.parse(
                        localStorage?.getItem("cabo") as string
                      ) as CaboData;
                      caboData.players.forEach((p, i) => {
                        if (i !== index) {
                          p.score += 50;
                        }
                      });
                      localStorage?.setItem("cabo", JSON.stringify(caboData));
                      setPlayers(caboData.players);
                    }}
                    className="m-1"
                  >
                    <FaPlaneArrival size={40} />
                  </button>
                  <button
                    onClick={() => {
                      player.score = 50;
                      const caboData = JSON.parse(
                        localStorage?.getItem("cabo") as string
                      ) as CaboData;
                      caboData.players[index] = player;
                      localStorage?.setItem("cabo", JSON.stringify(caboData));
                      setPlayers(caboData.players);
                    }}
                    className="m-1"
                  >
                    <VscDebugRestart size={40} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-20 rounded-2xl">
            <h2 className="text-3xl font-extrabold">Game Over!</h2>
            <h3 className="text-2xl font-bold">
              The winner is {winner?.name} with a score of {winner?.score}
            </h3>
            <button
              onClick={() => {
                setShowModal(false);
                // reset the scores
                const caboData = JSON.parse(
                  localStorage?.getItem("cabo") as string
                ) as CaboData;
                caboData.players.forEach((player) => {
                  player.score = 0;
                });
                localStorage?.setItem("cabo", JSON.stringify(caboData));
                setPlayers(caboData.players);
              }}
              className="bg-slate-200 p-3 rounded-2xl m-3"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {
        // Display an error message if the player name is empty
        playerNameEmpty && (
          <div className="bg-red-500 p-3 rounded-2xl m-3">
            Player name cannot be empty
            {/* button to change state when user agrees that player name cannot be empty */}
            <button
              onClick={() => setPlayerNameEmpty(false)}
              className="bg-slate-200 p-3 rounded-2xl m-3"
            >
              Close
            </button>
          </div>
        )
      }
    </div>
  );
}
