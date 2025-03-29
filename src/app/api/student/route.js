import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "AdmissionBatch.json");

export async function GET(req) {
  try {
    // Read and parse JSON file
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    console.log(typeof jsonData);

    // Extract studentNumber from query parameters
    const { searchParams } = new URL(req.url);
    const studentNumber = searchParams.get("studentNumber");

    if (!studentNumber) {
      return Response.json(
        { error: "studentNumber is required" },
        { status: 400 }
      );
    }

    // Search for student
    const student = jsonData.find(
      (student) => student.StudentNumber === studentNumber
    );

    if (!student) {
      return Response.json({ error: "Student not found" }, { status: 404 });
    }

    return Response.json(student);
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
