"use client";
import { Button } from "@/components/button/Button";
import React, { useEffect, useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaPlaneArrival } from "react-icons/fa6";

type CaboPlayer = {
  name: string;
  score: number;
};

type CaboData = {
  players: CaboPlayer[];
};

export default function CaboPage() {
  const [players, setPlayers] = useState<CaboPlayer[]>([]);

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

  const addPlayer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const playerName = formData.get("playerName") as string;

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
        <table className="m-5 w-1/2 ">
          <thead>
            <tr className="">
              <th className="m-1">Player</th>
              <th className="m-1">Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {players.map((player, index) => (
              <tr key={index}>
                <td className="m-1 ">{player.name}</td>
                <td className="m-1 ">{player.score}</td>
                <td className="flex justify-around">
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
                  >
                    <FaPlaneArrival size={40} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
