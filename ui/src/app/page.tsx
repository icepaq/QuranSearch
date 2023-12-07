/** @format */
"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import QuranSearch from "./quransearch";
import HadithSearch from "./hadithsearch";

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch("/api");
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center md:p-24 p-8">
      <div className="md:w-8/12 text-center text-xs">
        The data source is based off open source JSON files and have not been
        verified. They are credited in the project{" "}
        <a href="https://github.com/icepaq/QuranSearch" className="underline">
          Github
        </a>
        . Always verify outputs via Quran.com, Sunnah.com or a trusted source.
        Your browser type (eg Chrome, Safari...) is collected and stored for
        website analytics. It is deleted within 24 hours of your visit.
      </div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Quran" />
          <Tab label="Hadith (Sahih Al-Bukhari)" />
        </Tabs>
      </Box>
      <QuranSearch display={value} />
      <HadithSearch display={value} />
    </div>
  );
}
