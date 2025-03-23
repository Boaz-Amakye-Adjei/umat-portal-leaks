"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IoSearchSharp } from "react-icons/io5";
import Link from "next/link";

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

  // Function to handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(data); // Restore full list if input is cleared
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    const filteredResults = data.filter((student) => {
      const firstName = student.FirstName?.toLowerCase() || "";
      const lastName = student.LastName?.toLowerCase() || "";
      const fullName = student.FullName?.toLowerCase() || "";
      const applicantFullName =
        student.ApplicatantFullName?.toLowerCase() || "";

      return (
        firstName.includes(lowerCaseQuery) ||
        lastName.includes(lowerCaseQuery) ||
        fullName.includes(lowerCaseQuery) ||
        applicantFullName.includes(lowerCaseQuery)
      );
    });

    setFilteredData(filteredResults);
  }, [searchQuery, data]); // Runs when searchQuery or data changes

  return (
    <div>
      {/* Hero Section */}
      <section className="h-[400px]">
        <div
          className="flex justify-center items-center flex-col md:flex-row w-full px-[30px] py-[10px] gap-[10px] md:gap-[50px] h-full relative bg-cover bg-center"
          style={{ backgroundImage: "url('/umatlogo.jpg')" }}
        >
          <div className="absolute inset-0 bg-green-500/70"></div>
          <div className="relative z-10 text-white text-center">
            <h1 className="text-4xl font-bold">Welcome to UMaT</h1>
            <p className="text-lg mt-2">Leaked Admission List 2024/2025</p>
          </div>
        </div>
        <div className="bg-green-500 pt-[10px]">
          <div className="bg-[#ebf2f7] h-[20px] rounded-t-[30px]"></div>
        </div>
      </section>

      {/* Search Box */}
      <div className="h-[190px] flex justify-center items-center w-full">
        <div className="bg-white py-[40px] w-[90%] md:w-[55%] translate-y-[-65px] shadow-2xl rounded-[20px]">
          <h1 className="text-3xl font-bold text-center text-black mb-[10px]">
            Search
          </h1>
          <div className="flex justify-center items-center">
            <div className="w-[80%] md:w-[65%] flex rounded-[20px] shadow-xl mb-[40px]">
              <input
                type="text"
                className="px-[10px] py-[20px] flex-grow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Updates search state
                placeholder="Search here..."
              />
              <button className="p-[20px]">
                <IoSearchSharp />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Student List */}
      <section className="md:px-[55px] md:py-5 py-[30px] px-[10px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {filteredData.length > 0 ? (
          filteredData.map((student) => (
            <Card data={student} key={student.StudentNumber} />
          ))
        ) : (
          <p className="text-center w-full">No results found...</p>
        )}
      </section>
    </div>
  );
}

// Card Component
function Card({ data }) {
  const imgFormats = ["jpg", "png", "jpeg"];
  const baseUrl =
    "https://portal.umat.edu.gh//Content/FileDirectory/Student-Pictures/";

  const [formatIndex, setFormatIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(
    `${baseUrl}${data.StudentNumber}.${imgFormats[0]}`
  );

  const handleImageError = () => {
    if (formatIndex < imgFormats.length - 1) {
      const nextFormat = formatIndex + 1;
      setFormatIndex(nextFormat);
      setImgSrc(`${baseUrl}${data.StudentNumber}.${imgFormats[nextFormat]}`);
    } else {
      setImgSrc("/placeholder.jpg"); // Default image
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-[20px] p-[20px] max-w-[300px] flex justify-center items-center flex-col">
      <img
        src={imgSrc}
        alt="Student"
        className="w-[150px] h-[150px] rounded-full bg-gray-300 mb-[8px] object-cover"
        onError={handleImageError}
      />
      <div className="flex justify-center items-center flex-col">
        <h3 className="text-center font-bold text-xl capitalize">
          {data.FirstName + " " + data.LastName.toLowerCase()}
        </h3>
        <h3 className="text-center">{data.FullName}</h3>
        <Link
          href={`/details/${data.StudentNumber}`}
          className="bg-green-500 rounded-[20px] px-[10px] py-[5px] text-white mt-2 cursor-pointer"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
