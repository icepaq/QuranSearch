/** @format */
"use client";

import axios from "axios";
import { useState } from "react";

type QuranQuery = {
  ids: string[][];
  metadatas: {
    id: number;
    text: string;
    translation: string;
  }[][];
};

export default function Home() {
  const [disabled, setDisabled] = useState(false);
  const [verses, setVerses] = useState<QuranQuery | null>(null);

  const handleSearch = async () => {
    const input = document.getElementById("verseinput") as HTMLInputElement;
    const query = input.value;

    setDisabled(true);
    const res = await axios.post(
      "https://quransearch-pxvdltgq6a-uc.a.run.app/findVerse",
      {
        query: query,
      }
    );
    setDisabled(false);
    setVerses(res.data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-stone-700 m-4">
        Enter Your Verse Or Question
      </h1>
      <input
        id="verseinput"
        type="text"
        placeholder="Seek refuge from"
        className="p-4 border-2 rounded-md w-8/12"
      />

      {/* put a button inside of the intput */}
      <button
        className={`${
          disabled
            ? "bg-slate-500"
            : "bg-blue-400 hover:bg-blue-500 transition-all"
        } text-white px-10 py-3 rounded-md m-4`}
        disabled={disabled}
        onClick={handleSearch}
      >
        Search
      </button>

      <p className="w-8/12 text-center m-4 text-stone-700">
        If you are trying to remember a verse but are not able to remember the
        exact chapter or verse number, type your best recollections here.
        Currently only words for English works. Transliterated words such as
        &quot;ribba&quot; or &quot;shirk&quot; will not work.
      </p>
      <div className="flex flex-col content-start">
        {verses?.metadatas[0].map((verse, index) => (
          <a
            href={`https://quran.com/${verses.ids[0][index].split("-")[0]}/${
              verses.ids[0][index].split("-")[1]
            }`}
            key={verse.id}
          >
            <div className="mb-8 rounded-xl bg-sky-100 p-8">
              <div>{verses.ids[0][index]}</div>
              <div>{verse.text}</div>
              <div>{verse.translation}</div>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
