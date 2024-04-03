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
  const [caboLocalStorageItem, setCaboLocalStorageItem] = useState<
    string | null
  >(null);
  let localStorage: Storage | undefined = undefined;
  let caboData: CaboData = { players: [] };

  useEffect(() => {
    // Access localStorage in useEffect which only runs on the client
    const caboStorageItem = localStorage?.getItem("cabo");
    if (caboStorageItem) {
      const caboData = JSON.parse(caboStorageItem);
      setPlayers(caboData.players || []);
      setCaboLocalStorageItem(caboStorageItem);
    }
  }, []);

  if (typeof window !== "undefined") {
    localStorage = window.localStorage;
    setCaboLocalStorageItem(localStorage.getItem("cabo"));
  }

  if (caboLocalStorageItem) {
    caboData = JSON.parse(caboLocalStorageItem);
  } else {
    const initialCaboData = { players: [] };
    localStorage?.setItem("cabo", JSON.stringify(initialCaboData));
    caboData = initialCaboData;
  }

  console.log(caboData.players);

  const handleAddPlayerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement; // Cast 'form' to HTMLFormElement
    const formData = new FormData(form);
    const playerName = formData.get("playerName");
    // Add player to the list of players
    const newPlayer = { name: playerName, score: 0 };
    caboData.players.push(newPlayer as CaboPlayer);
    localStorage?.setItem("cabo", JSON.stringify(caboData));
    form.reset();
    setPlayers(caboData.players);
  };

  useEffect(() => {
    setPlayers(caboData.players);
  }, []);

  function handleRestartGame(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const initialCaboData = { players: [] };
    localStorage?.setItem("cabo", JSON.stringify(initialCaboData));
    setPlayers(initialCaboData.players);
  }

  function handleRestartScores(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    caboData.players.forEach((player) => {
      player.score = 0;
    });
    localStorage?.setItem("cabo", JSON.stringify(caboData));
    setPlayers(caboData.players);
  }

  function handlePlayerMinus(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    throw new Error("Function not implemented.");
  }

  function handlePlayerKamikaze(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    throw new Error("Function not implemented.");
  }

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
          onSubmit={handleAddPlayerSubmit}
          className="flex justify-evenly w-1/3 m-3 items-center"
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
          <form action="" onSubmit={handleRestartGame}>
            <Button buttonText="Restart Game" type={"submit"} />
          </form>
          <form action="" onSubmit={handleRestartScores}>
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
                      console.log("clicking +1");
                      player.score += 1;
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
