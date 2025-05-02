import { Input } from "@/components/ui/input";
import Card from "./card";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function RenderCards({
  students,
  isLoading,
  error,
  totalStudents,
}) {
  const [value, setValue] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateLimit = () => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", value);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleValueChange = (value) => {
    setValue(value);
  };

  if (isLoading) {
    return <p className="text-center w-full min-h-[500px]">Fetching Data...</p>;
  }

  if (error) {
    return (
      <p className="text-center w-full text-red-500">Error fetching data.</p>
    );
  }

  if (!students || students.length === 0) {
    return <p className="text-center w-full">No students found.</p>;
  }

  return (
    <article
      id="rc"
      className="md:px-[55px] md:py-5 py-[30px] px-[10px] max-w-[1227px] lg:mx-auto min-h-[150px]"
    >
      <div className="flex justify-between items-center pb-[10px]">
        <p className="bg-white py-2 rounded px-3 flex items-center text-green-600 gap-2">
          <FaUser /> {totalStudents}{" "}
          <span className="hidden md:block">students</span>
        </p>
        <div className="flex items-center">
          <Input
            className="w-[50px] bg-white py-2"
            type="number"
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder="0"
          />
          <button
            className="py-2 px-3 rounded ml-[9px]  bg-green-600 text-white cursor-pointe"
            onClick={updateLimit}
          >
            Items per page
          </button>
        </div>
      </div>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 min-h-[300px]">
        {students.map((student) => (
          <Card data={student} key={student.StudentNumber} />
        ))}
      </section>
    </article>
  );
}
