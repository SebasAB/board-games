"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  let localStorage: Storage | undefined;

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage = window.localStorage;
    }
  }, []);

  const caboLocalStorageItem = localStorage?.getItem("cabo");
  if (!caboLocalStorageItem) {
    const initialCaboData = { players: [] };
    localStorage?.setItem("cabo", JSON.stringify(initialCaboData));
  }

  const telefunkenLocalStorageItem = localStorage?.getItem("telefunken");
  if (!telefunkenLocalStorageItem) {
    const initialTelefunkenData = { players: [] };
    localStorage?.setItem("telefunken", JSON.stringify(initialTelefunkenData));
  }

  const cluedoLocalStorageItem = localStorage?.getItem("cluedo");
  if (!cluedoLocalStorageItem) {
    const initialCluedoData = {
      rooms: [],
      weapons: [],
      characters: [],
    };
    localStorage?.setItem("cluedo", JSON.stringify(initialCluedoData));
  }

  redirect("/board-games");
}
