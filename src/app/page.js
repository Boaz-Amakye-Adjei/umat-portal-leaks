"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "./components/search";
import RenderCards from "./components/RenderCards";
import PaginationComponent from "./components/pagination/pagination";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Extract page and limit from URL or use defaults
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 12;

  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(`/api/data?page=${page}&limit=${limit}`);
        const data = await response.json();

        if (response.ok) {
          setStudents(data.data);
          setTotalPages(data.totalPages);
        } else {
          console.error("Error fetching students:", data.error);
          setIsError(true);
        }
      } catch (error) {
        console.error("Network error:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [page, limit]); // Refetch when page or limit changes

  // Function to update the URL search parameters without reloading
  const updatePage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

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

      {/* Search Box */}
      <Search />

      {/* Student List */}
      <RenderCards students={students} isLoading={isLoading} error={error} />

      {/* Pagination */}
      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        onPageChange={updatePage}
      />
    </div>
  );
}
