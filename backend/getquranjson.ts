/** @format */

/**
 * @deprecated
 * @deprecated
 * @deprecated
 * @deprecated
 */

import axios from "axios";
import fs from "fs";

(async () => {
  const quranJSON: any[] = [];
  try {
    for (let i = 2; i <= 2; i++) {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const chapter: any[] = [];

      const start = Date.now();
      const data = (
        await axios.get(
          `https://api.quran.com/api/v4/verses/by_chapter/${i}?words=true`
        )
      ).data;
      const end = Date.now();

      console.log(i);
      console.log(`Time taken: ${(end - start) / 1000} seconds`);

      const verses = data.verses;

      verses.forEach((verse: any) => {
        const wordsInVerse = (verse.words as any[]).map(
          (word) => word.translation.text
        );

        chapter.push(wordsInVerse.join(" "));
      });

      quranJSON.push(chapter);
    }
  } catch (error) {
    console.log(error);
  }

  // write out to file
  fs.writeFileSync("./quran.json", JSON.stringify(quranJSON, null, 2), "utf-8");
})();
