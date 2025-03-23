"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IoSearchSharp } from "react-icons/io5";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        console.log("fetching data...");
        const response = await axios.get(
          "https://portal.umat.edu.gh/api-v1/live/admissions/api/Util/GetAdmissionBatch"
        );
        setData(response.data);
        console.log(response.data);
        console.log("flatted", response.data.flat());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, []);

  return (
    <div className="">
      <div>
        <section className="h-[400px]">
          <div
            id="hero section"
            className="flex justify-center items-center flex-col md:flex-row w-full px-[30px] py-[10px] gap-[10px] md:gap-[50px] h-full relative bg-cover bg-center"
            style={{ backgroundImage: "url('/umatlogo.jpg')" }}
          >
            {/* Green overlay */}
            <div className="absolute inset-0 bg-green-500/70"></div>

            {/* Content inside hero section (place your text/buttons here) */}
            <div className="relative z-10 text-white text-center">
              <h1 className="text-4xl font-bold">Welcome to UMaT</h1>
              <p className="text-lg mt-2">Leaked Admission List 2024/2025</p>
            </div>
          </div>

          <div className="bg-green-500 pt-[10px]">
            <div className="bg-[#ebf2f7] h-[20px] rounded-t-[30px]"></div>
          </div>
        </section>

        <div className="h-[190px] flex justify-center items-center w-full">
          <div className="bg-white py-[40px] w-[90%] md:w-[55%] translate-y-[-65px] shadow-2xl rounded-[20px]">
            <h1 className="text-3xl font-bold text-center text-black mb-[10px]">
              Search
            </h1>
            <div className="flex justify-center items-center">
              <div className="w-[65%] flex rounded-[20px] shadow-xl">
                <input
                  type="text"
                  className=" px-[10px] py-[20px]  flex-grow"
                />
                <button className="p-[20px]">
                  <IoSearchSharp />
                </button>
              </div>
            </div>
            <div className="mt-[20px] flex justify-center items-center">
              <button>How this Vulnerability was discovered</button>
            </div>
          </div>
        </div>

        <section className="md:px-[55px] md:py-5 py-[30px] px-[10px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {data.length > 0 ? (
            data
              .flat()
              .map((data) => <Card data={data} key={data.StudentNumber} />)
          ) : (
            <p>fetching data...</p>
          )}
        </section>
      </div>
    </div>
  );
}

function Card({ data }) {
  const imgFormats = ["jpg", "png", "jpeg"];
  const baseUrl =
    "https://portal.umat.edu.gh//Content/FileDirectory/Student-Pictures/";

  const [formatIndex, setFormatIndex] = useState(0);
  const [bgImage, setBgImage] = useState(
    `url(${baseUrl}${data.StudentNumber}.${imgFormats[0]})`
  );

  const handleImageError = () => {
    if (formatIndex < imgFormats.length - 1) {
      const nextFormat = formatIndex + 1;
      setFormatIndex(nextFormat);
      setBgImage(
        `url(${baseUrl}${data.StudentNumber}.${imgFormats[nextFormat]})`
      );
    } else {
      // If all formats fail, set a default placeholder image
      setBgImage("url('/placeholder.jpg')");
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-[20px] p-[20px] max-w-[300px] flex justify-center items-center flex-col">
      {/* Image as background */}
      <div
        id="img"
        className="w-[150px] h-[150px] rounded-full bg-gray-300 mb-[8px] bg-cover bg-center"
        style={{ backgroundImage: bgImage }}
        onError={handleImageError} // Not supported for div background, so error handling must be improved if needed
      ></div>

      {/* User details */}
      <div className="flex justify-center items-center flex-col">
        <h3 className="text-center font-bold text-xl capitalize">
          {data.FirstName + " " + data.LastName.toLowerCase()}
        </h3>
        <h3 className="text-center">{data.FullName}</h3>
        <button className="bg-green-500 rounded-[20px] px-[10px] py-[5px] text-white mt-2 cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  );
}
