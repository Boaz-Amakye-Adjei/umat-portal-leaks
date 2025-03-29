import fs from "fs";
import path from "path";

export async function GET(req) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "5", 10);

  const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "AdmissionBatch.json"
  );
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / limit);

  return Response.json({
    page,
    limit,
    totalPages,
    data: paginatedData,
  });
}
