"use client";
import ProfileImage from "@/app/components/Image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function DetailPage() {
  const params = useParams(); // Get route parameters
  const { id } = params; // Extract the 'id'
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`/api/student?studentNumber=${id}`);
        const data = await response.json();

        if (response.ok) {
          setData(data);
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

    fetchStudent();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <section className="flex">
        <div className="w-full md:w-[320px] h-[320px] text-white shadow-2xl bg-[#404040] flex flex-col justify-center items-center gap-2">
          <ProfileImage studentNumber={data.StudentNumber} s={200} />
          <h3 className="text-center font-bold text-xl capitalize ">
            {data.ApplicatantFullName}
          </h3>
          <p>{data.StudentNumber}</p>
        </div>
        <div
          className="flex-grow hidden md:block"
          style={{
            backgroundImage: `url("https://portal.umat.edu.gh/apply/congrats_background.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </section>
      <section className="my-5 md:flex px-5 md:px-0">
        <div className="md:w-[320px] flex justify-center items-center md:justify-end md:items-start md:px-5">
          <h3 className="py-3 border-l-3 border-solid border-green-500 shadow-2xl bg-white w-[90%] md:w-[200px] px-2">
            Leaked Info
          </h3>
        </div>

        <div className="bg-white shadow-2xl mt-[20px] md:mt-0 flex-grow p-[25px]">
          <h2 className="font-bold text-xl py-[20px]">Personal information</h2>
          <InfoSpace title="Name" info={data.ApplicatantFullName} />
          <InfoSpace
            title="Gender"
            info={data.GenderId == "M" ? "Male" : "Female"}
          />
          <InfoSpace title="Date of Birth" info={data.DateOfBirth} />

          <hr />
          <h2 className="font-bold text-xl py-[20px]">Contact information</h2>
          <InfoSpace title="Email" info={data.Email} />
          <InfoSpace title="Phone Number" info={data.PrimaryNumber} />
          <InfoSpace title="Other Phone Number" info={data.OtherNumber} />
          <InfoSpace
            title="Residential Address"
            info={data.ResidentialAddress1}
          />
          <InfoSpace title="Postal Address" info={data.AddressLine1} />
          <InfoSpace title="Ghana Post Address" info={data.GhanaPostCode} />
          <hr />
          <h2 className="font-bold text-xl py-[20px]">Admission information</h2>
          <InfoSpace title="Application ID" info={data.ApplicationId} />
          <InfoSpace title="Application Year" info={data.ApplicationYear} />
          <InfoSpace title="Application Date" info={data.AdmittedDate} />
          <InfoSpace title="Application Batch" info={data.AdmittedBatch} />
          <InfoSpace title="Form Pin Code" info={data.FormPinCode} />

          <hr />
          <h2 className="font-bold text-xl py-[20px]">Academic information</h2>
          <InfoSpace title="Reference Number" info={data.StudentNumber} />
          <InfoSpace title="Campus" info={data.Campus} />
          <InfoSpace title="Programme" info={data.ProgrammeFullName} />
          <InfoSpace title="Programme Code" info={data.ProgrammeCode} />
          <InfoSpace title="Programme Funding" info={data.ProgrammeFunding} />
          <InfoSpace
            title="Academic Year"
            info={data.AcademicYearForStudentLevel}
          />
          <InfoSpace
            title="Semester For Student Level"
            info={data.SemesterForStudentLevel}
          />
          <InfoSpace
            title="Minimum Passed Credit"
            info={data.MinimumPassedCredit}
          />
          <InfoSpace title="Maximum Credit" info={data.MaximumCredit} />

          <hr />
          <h2 className="font-bold text-xl py-[20px]">
            Residential information
          </h2>
          <InfoSpace title="Hall of Residence" info={data.Hall} />
          <InfoSpace title="Residential Status" info={data.ResidentialStatus} />

          <hr />
          <h2 className="font-bold text-xl py-[20px]">
            Additional information
          </h2>
          <InfoSpace title="Guardian ID" info={data.GuardianId} />
          <InfoSpace title="Place of Birth" info={data.PlaceOfBirth} />
          <InfoSpace title="Home Town" info={data.City} />
          <InfoSpace title="Region ID" info={data.RegionId} />
          <InfoSpace title="Denomination ID" info={data.DenominationId} />

          <hr className="my-3" />

          <div className="flex gap-3 py-[20px] flex-col md:flex-row">
            <button className="py-2 px-3 rounded  hover:bg-green-200 bg-green-600 text-white cursor-pointer delay-75">
              Submit Petition
            </button>

            <button className="py-2 px-3 rounded border-[grey] border-soild border  text-black cursor-pointer delay-75">
              Send an Email to the School Administrator
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoSpace({ title, info }) {
  return (
    <article className="flex gap-2 items-center mb-2">
      <h2 className="capitalize">{title + ":"}</h2>
      <h2 className="py-2 px-3 rounded bg-[#f8f1f1]">{info}</h2>
    </article>
  );
}
