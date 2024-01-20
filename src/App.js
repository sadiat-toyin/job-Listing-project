import "./App.scss";
import Main from "./Components/Main";
import Header from "./Components/Header";
import jobsData from "./assets/data.json";
import { useState } from "react";

function App() {
  const [jobs, setJobs] = useState(jobsData);
  const [filters, setFilters] = useState([]);
  console.log(jobsData);
  //{type: "role", value: "Senior"}
  const filteredJobs = (jobs, updatedFilters) => {
    const filteredJobs = jobsData.filter((job) => {
      let levelcheck,
        roleCheck,
        languagesCheck,
        toolsCheck = false;

      if (updatedFilters.some((filter) => filter.type === "level")) {
        levelcheck = true;
      }

      if (updatedFilters.some((filter) => filter.type === "role")) {
        roleCheck = true;
      }

      if (updatedFilters.some((filter) => filter.type === "language")) {
        languagesCheck = true;
      }

      if (updatedFilters.some((filter) => filter.type === "tools")) {
        toolsCheck = true;
      }
      return (
        (levelcheck
          ? job.level ===
            updatedFilters.find((filter) => filter.type === "level").value
          : true) &&
        (roleCheck
          ? job.role ===
            updatedFilters.find((filter) => filter.type === "role").value
          : true) &&
        (toolsCheck
          ? updatedFilters
              .filter((f) => f.type === "tools")
              .every((f) => job.tools.indexOf(f.value) > -1)
          : true) &&
        (languagesCheck
          ? updatedFilters
              .filter((f) => f.type === "language")
              .every((f) => job.languages.indexOf(f.value) > -1)
          : true)
      );
    });

    setJobs(filteredJobs);
  };
  const addFilters = (data) => {
    const dataExisting = filters.some(
      (filter) => filter.type === data.type && filter.value === data.value
    );
    if (!dataExisting) {
      const updatedFilters = [...filters, data];
      setFilters(updatedFilters);
      filteredJobs(jobs, updatedFilters);
      const filterJobs = jobsData.filter((job) => {
        let levelcheck,
          roleCheck,
          languagesCheck,
          toolsCheck = false;

        if (updatedFilters.some((filter) => filter.type === "level")) {
          levelcheck = true;
        }

        if (updatedFilters.some((filter) => filter.type === "role")) {
          roleCheck = true;
        }

        if (updatedFilters.some((filter) => filter.type === "language")) {
          languagesCheck = true;
        }

        if (updatedFilters.some((filter) => filter.type === "tools")) {
          toolsCheck = true;
        }
        return (
          (levelcheck
            ? job.level ===
              updatedFilters.find((filter) => filter.type === "level").value
            : true) &&
          (roleCheck
            ? job.role ===
              updatedFilters.find((filter) => filter.type === "role").value
            : true) &&
          (toolsCheck
            ? updatedFilters
                .filter((f) => f.type === "tools")
                .every((f) => job.tools.indexOf(f.value) > -1)
            : true) &&
          (languagesCheck
            ? updatedFilters
                .filter((f) => f.type === "language")
                .every((f) => job.languages.indexOf(f.value) > -1)
            : true)
        );
      });
      setJobs(filterJobs);
    }
  };

  const clearFilters = () => {
    setFilters([]);
    setJobs(jobsData);
  };

  const removeFilter = (filterData) => {
    const updatedFilters = filters.filter((filterItem) => {
      return (
        filterItem.type !== filterData.type &&
        filterItem.value !== filterData.value
      );
    });
    setFilters(updatedFilters);
    filteredJobs(jobsData, updatedFilters);
  };

  return (
    <>
      <Header
        filters={filters}
        clearFilters={clearFilters}
        removeFilter={removeFilter}
      />
      <Main jobs={jobs} addFilters={addFilters} />
    </>
  );
}

export default App;
