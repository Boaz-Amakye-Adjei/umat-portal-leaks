import { readFile, writeFile, access } from "fs/promises";
import path from "path";

export async function GET() {
  const URL =
    "https://portal.umat.edu.gh/api-v1/live/admissions/api/Util/GetAdmissionBatch";
  const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "AdmissionBatch.json"
  );

  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    let rawData = await res.json();

    // If wrapped in nested arrays, flatten it
    let newData = [];
    if (Array.isArray(rawData)) {
      if (Array.isArray(rawData[0])) {
        newData = rawData.flat();
      } else {
        newData = rawData;
      }
    } else if (typeof rawData === "object") {
      newData = [rawData]; // wrap single object in array
    }

    // Read existing data
    let existingData = [];
    try {
      await access(filePath);
      const content = await readFile(filePath, "utf-8");
      existingData = JSON.parse(content);
    } catch {
      existingData = [];
    }

    // Deduplicate using ApplicationId
    const map = new Map();
    for (const item of existingData) {
      map.set(item.ApplicationId, item);
    }
    for (const item of newData) {
      map.set(item.ApplicationId, item);
    }

    const mergedData = Array.from(map.values());

    await writeFile(filePath, JSON.stringify(mergedData, null, 2));

    return Response.json({
      success: true,
      message: "Admission applicants data updated.",
      count: mergedData.length,
      updated: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
