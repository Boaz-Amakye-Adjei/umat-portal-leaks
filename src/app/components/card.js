import { useState } from "react";
import Link from "next/link";
import ProfileImage from "./Image";

export default function Card({ data }) {
  return (
    <div className="bg-white shadow-2xl rounded-[20px] p-[20px] max-w-[300px] flex justify-center items-center flex-col">
      <ProfileImage studentNumber={data.StudentNumber} s={150} />

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
