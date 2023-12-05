/** @format */
"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import QuranSearch from "./quransearch";
import HadithSearch from "./hadithsearch";

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="flex min-h-screen flex-col items-center md:p-24 p-8">
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
