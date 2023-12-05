/** @format */

import { useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";

type Hadith = {
  id: string;
  arabic: string;
  english_narrator: string;
  english_text: string;
  chapterId: string;
  bookId: string;
  idInBook: string;
  line: string;
};

const HadithSearch = ({ display }: { display: number }) => {
  const [disabled, setDisabled] = useState(false);
  const [verses, setVerses] = useState<Hadith[]>([]);
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    setDisabled(true);
    const res = await axios.post(
      "https://quransearch-pxvdltgq6a-uc.a.run.app/findHadith",
      // "http://localhost:4999/findHadith",
      {
        query: query,
      }
    );
    setDisabled(false);

    console.log(res.data);

    const data = res.data;

    const organizedData: Hadith[] = data.metadatas[0].map(
      (hadith: any) => hadith
    );

    console.log({ organizedData });

    setVerses(organizedData);
  };
  return (
    <div className={`${display === 0 ? "hidden" : ""}`}>
      <main className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-4xl font-bold text-stone-700 my-4 text-center">
          Enter Hadith or Question
        </h1>

        <p className="md:w-8/12 text-center m-4 text-stone-700 bg-red-200 p-4 rounded-md">
          Certain chapters and line numbers may not be entirely accurate. I am
          currently building a new data set.
        </p>

        <input
          id="verseinput"
          type="text"
          placeholder="Delaying the prayer"
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
          If you have a question or are trying to find a hadith that you
          don&apos;t remembe exactly, type your best recollection of the hadith.
          You will see the 10 closet hadiths to your query. Transliterated words
          such as &quot;ribba&quot; or &quot;shirk&quot; will not work.
        </p>
        <div className="flex flex-col content-start">
          {verses.map((verse) => (
            <a
              href={`https://sunnah.com/bukhari/${verse.chapterId}/${verse.line}`}
              key={`${verse.chapterId}/${verse.line}`}
            >
              <div className="mb-8 rounded-xl bg-sky-100 p-8">
                <div>{verse.chapterId + "-" + verse.line}</div>
                <div>{verse.english_narrator}</div>
                <div>{verse.english_text}</div>
                <div>{verse.arabic}</div>
              </div>
            </a>
          ))}
        </div>
      </main>{" "}
    </div>
  );
};

export default HadithSearch;
