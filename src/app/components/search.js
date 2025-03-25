import { IoSearchSharp } from "react-icons/io5";
import { useEffect } from "react";

export default function Search({
  setSearchQuery,
  searchQuery,
  setFilteredData,
  data,
}) {
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
    <div className="h-[190px] flex justify-center items-center w-full">
      <div className="bg-white py-[40px] w-[90%] md:w-[65%] lg:w-[40%] translate-y-[-65px] shadow-2xl rounded-[10px]">
        <h1 className="text-3xl font-bold text-center text-black mb-[10px]">
          Search
        </h1>
        <div className="flex justify-center items-center">
          <div className="w-[80%] md:w-[80%] flex rounded-[20px] shadow-xl mb-[40px]">
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
  );
}
