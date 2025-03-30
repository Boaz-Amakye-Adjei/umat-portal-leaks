import { useState } from "react";
import Link from "next/link";
import ProfileImage from "./Image";
import { ImSpinner2 } from "react-icons/im";

export default function Card({ data }) {
  const [isnavigation, setIsNavigation] = useState(false);

  const handleNavigationLoader = () => {
    setIsNavigation(true);
  };
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
          onClick={handleNavigationLoader}
          className="bg-green-500 rounded-[20px] px-[10px] py-[5px] text-white mt-2 cursor-pointer min-w-[105.812px] flex justify-center items-center"
        >
          {isnavigation ? (
            <div className="animate-spin">
              <ImSpinner2 className="text-xl" />
            </div>
          ) : (
            <p>View Details</p>
          )}
        </Link>
      </div>
    </div>
  );
}
