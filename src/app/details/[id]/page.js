"use client";
import { useParams } from "next/navigation";

export default function DetailPage() {
  const params = useParams(); // Get route parameters
  const { id } = params; // Extract the 'id'

  return (
    <div>
      <h1>Details for ID: {id}</h1>
    </div>
  );
}
