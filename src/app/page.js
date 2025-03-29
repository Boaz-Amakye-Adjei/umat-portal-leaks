"use client";
import { Suspense } from "react";
import StudentList from "./components/studentList";

export default function Home() {
  return (
    <div className="mb-[50px]">
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

      <Suspense fallback={<p>Loading...</p>}>
        <StudentList />
      </Suspense>
    </div>
  );
}
