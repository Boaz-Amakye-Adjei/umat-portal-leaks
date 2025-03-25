"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IoSearchSharp } from "react-icons/io5";
import Search from "./components/search";
import RenderCards from "./components/RenderCards";

export default function Home() {
  const [data, setData] = useState([]); // Stores original fetched data
  const [filteredData, setFilteredData] = useState([]); // Data shown in UI
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

  useEffect(() => {
    async function getData() {
      try {
        console.log("Fetching data...");
        const response = await axios.get(
          "https://portal.umat.edu.gh/api-v1/live/admissions/api/Util/GetAdmissionBatch"
        );
        const flattenedData = response.data.flat(); // Flatten array
        setData(flattenedData);
        setFilteredData(flattenedData); // Initialize displayed data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="h-[400px]">
        <div className="flex justify-center items-center flex-col md:flex-row w-full px-[30px] py-[10px] gap-[10px] md:gap-[50px] h-full relative bg-cover bg-center">
          <div className="absolute inset-0 bg-green-500/70"></div>
          <div className="relative z-10 text-white text-center">
            <h1 className="text-4xl font-bold">Leaked UMaT Admission List</h1>
            <p className="text-lg mt-2">
              This website displays information leaked from the UMaT Admission
              Portal API.
            </p>
          </div>
        </div>
        <div className="bg-green-500/70 pt-[10px]">
          <div className="bg-[#ebf2f7] h-[20px] rounded-t-[30px] md:rounded-t-[120px]"></div>
        </div>
      </section>

      {/* Search Box */}
      <Search
        searchQuery={searchQuery}
        setFilteredData={setFilteredData}
        setSearchQuery={setSearchQuery}
        data={data}
      />

      {/* Student List */}
      <RenderCards filteredData={filteredData} data={data} />
    </div>
  );
}
