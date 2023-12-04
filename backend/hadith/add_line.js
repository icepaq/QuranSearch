/** @format */

/**
 * This script adds a line number to each hadith in the JSON file. Just for easier backlinking to sunnah.com
 */

const fs = require("fs");

// Read the JSON file
fs.readFile("bukhari.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  try {
    const jsonContent = JSON.parse(data);

    let hadiths = jsonContent.hadiths;
    let currentChapter = 0;
    let lineCounter = 0;

    hadiths.forEach((hadith) => {
      if (hadith.chapterId !== currentChapter) {
        currentChapter = hadith.chapterId;
        lineCounter = 1;
      } else {
        lineCounter++;
      }

      hadith.line = lineCounter;
    });

    // Save the updated JSON back to the file
    fs.writeFile(
      "updated_file.json",
      JSON.stringify(jsonContent, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing the file:", err);
          return;
        }
        console.log("File updated successfully!");
      }
    );
  } catch (err) {
    console.error("Error parsing JSON:", err);
  }
});
