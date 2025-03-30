import { Input } from "@/components/ui/input";
import Card from "./card";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function RenderCards({ students, isLoading, error }) {
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
    return <p className="text-center w-full">Fetching Data...</p>;
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
    <article className="md:px-[55px] md:py-5 py-[30px] px-[10px] max-w-[1227px] lg:mx-auto">
      <div className="flex justify-end items-center pb-[10px]">
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
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 min-h-[300px]">
        {students.map((student) => (
          <Card data={student} key={student.StudentNumber} />
        ))}
      </section>
    </article>
  );
}
