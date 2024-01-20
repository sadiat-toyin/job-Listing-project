import JobListing from "./JobListing";

function Main({ jobs, addFilters }) {
  return (
    <main>
      {jobs.map((job, index) => {
        return <JobListing key={index} job={job} addToFilters={addFilters} />;
      })}
    </main>
  );
}

export default Main;
