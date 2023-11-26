/** @format */
"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material";
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
  const [value, setValue] = useState(0);

  const [query, setQuery] = useState("");

  const handleSearch = async () => {
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Quran" />
          <Tab label="Hadith (Sahih Al-Bukhari)" disabled />
        </Tabs>
      </Box>
      <div className={`${value === 0 ? "flex" : "hidden"}`}>
        <main className="flex flex-col items-center justify-center mt-20">
          <h1 className="text-4xl font-bold text-stone-700 m-4">
            Enter Your Verse Or Question
          </h1>
          <input
            id="verseinput"
            type="text"
            placeholder="Seek refuge from"
            className="p-4 border-2 rounded-md w-8/12"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
            If you are trying to remember a verse but are not able to remember
            the exact chapter or verse number, type your best recollections
            here. Currently only words for English works. Transliterated words
            such as &quot;ribba&quot; or &quot;shirk&quot; will not work.
          </p>
          <div className="flex flex-col content-start">
            {verses?.metadatas[0].map((verse, index) => (
              <a
                href={`https://quran.com/${
                  verses.ids[0][index].split("-")[0]
                }/${verses.ids[0][index].split("-")[1]}`}
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
        </main>{" "}
      </div>
    </div>
  );
}