import { useState } from "react";
import Link from "next/link";

export default function Card({ data }) {
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
