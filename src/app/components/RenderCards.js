import Card from "./card";

export default function RenderCards({ filteredData, data, isLoading }) {
  return (
    <section className="md:px-[55px] md:py-5 py-[30px] px-[10px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {!isLoading && filteredData.length > 0 ? (
        filteredData.map((student) => (
          <Card data={student} key={student.StudentNumber} />
        ))
      ) : isLoading ? (
        <p className="text-center w-full">Fetching Data...</p>
      ) : data.length > 0 ? (
        <p className="text-center w-full">No results found...</p>
      ) : (
        <p className="text-center w-full">Some error occured</p>
      )}
    </section>
  );
}
