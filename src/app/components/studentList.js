"use client"; // Mark only this component as a Client Component

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import RenderCards from "./RenderCards";
import PaginationComponent from "./pagination/pagination";
import Search from "./search";

export default function StudentList() {
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
  const [totalStudents, setTotalStudents] = useState(0);

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
          setTotalStudents(data.totalStudent);
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
    <div>
      <Search />

      <RenderCards
        totalStudents={totalStudents}
        students={students}
        isLoading={isLoading}
        error={error}
      />

      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        onPageChange={updatePage}
      />
    </div>
  );
}
