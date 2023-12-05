/** @format */

import { useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";

type QuranQuery = {
  chapter: number;
  verse: number;
  text: string;
  translation: string;
};

const QuranSearch = ({ display }: { display: number }) => {
  const [disabled, setDisabled] = useState(false);
  const [verses, setVerses] = useState<QuranQuery[]>([]);
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

    console.log(res.data);

    const data = res.data;

    const organizedData: QuranQuery[] = data.metadatas[0].map(
      (verse: any, index: number) => {
        return {
          chapter: parseInt(data.ids[0][index].split("-")[0]),
          verse: parseInt(data.ids[0][index].split("-")[1]),
          text: verse.text,
          translation: verse.translation,
        } as QuranQuery;
      }
    );

    console.log({ organizedData });

    setVerses(organizedData);
  };
  return (
    <div className={`${display === 0 ? "" : "hidden"}`}>
      <main className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-4xl font-bold text-stone-700 my-4 text-center">
          Enter Your Verse Or Question
        </h1>
        <input
          id="verseinput"
          type="text"
          placeholder="Seek refuge from"
          className="p-4 border-2 rounded-md md:w-8/12"
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
          {disabled ? (
            <Bars color="white" width={"50"} height={"25"} />
          ) : (
            "Search"
          )}
        </button>

        <p className="md:w-8/12 text-center m-4 text-stone-700">
          If you are trying to remember a verse but are not able to remember the
          exact chapter or verse number, type your best recollections here. Only
          works for English words. Transliterated words such as
          &quot;ribba&quot; or &quot;shirk&quot; will not work.
        </p>
        <div className="flex flex-col content-start">
          {verses.map((verse) => (
            <a
              href={`https://quran.com/${verse.chapter}/${verse.verse}`}
              key={`${verse.chapter}/${verse.verse}`}
            >
              <div className="mb-8 rounded-xl bg-sky-100 p-8">
                <div>{verse.chapter + "-" + verse.verse}</div>
                <div>{verse.text}</div>
                <div>{verse.translation}</div>
              </div>
            </a>
          ))}
        </div>
      </main>{" "}
    </div>
  );
};

export default QuranSearch;
