import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { IoMdDoneAll } from "react-icons/io";
import profileData from "../assets/profile.json"; // Ensure the path matches your file structure

const SingleProduct = () => {
  const { id } = useParams(); // Extract the report ID from the URL
  const [reportData, setReportData] = useState(null);
  const [reportGenerationProgress, setReportGenerationProgress] = useState(0);
  const reportIsGenerated = reportGenerationProgress >= 100;

  useEffect(() => {
    // Find and set the report data based on the ID
    const report = profileData.users
      .flatMap((user) => user.reports)
      .find((report) => report.id === id);
    if (report) {
      setReportData(report.metadata); // Assuming the structure matches your JSON
    }
  }, [id]);

  useEffect(() => {
    // Simulate report generation progress
    const interval = setInterval(() => {
      setReportGenerationProgress((prevProgress) => {
        const nextProgress = prevProgress + 10;
        return nextProgress >= 100 ? 100 : nextProgress;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!reportData) {
    return <div>Loading...</div>; // Provide better loading state as needed
  }

  // Assuming 'generatedOn' should be part of 'reportData' or calculated here
  const generatedOn = new Date(parseInt(id.split("_")[1])).toLocaleDateString();

  const renderParameters = (parameters) => {
    return Object.entries(parameters).map(([key, value]) => (
      <div
        key={key}
        className="mt-2 bg-gray-100 rounded-lg p-2 flex items-center "
      >
        <h2 className="pr-4 text-lg font-semibold">
          {key.replace(/([A-Z])/g, " $1").trim()}:
        </h2>
        <p className="text-lg">
          {Array.isArray(value) ? value.join(", ") : value}
        </p>
      </div>
    ));
  };

  return (
    <section className="p-6">
      <div className="text-lg breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
          <li>Report ID: {id}</li>
        </ul>
      </div>
      <article className="mt-6 bg-white shadow rounded-lg overflow-hidden p-12">
        <h1 className="text-3xl font-semibold mb-4">Report Details</h1>
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold">Generated on: {generatedOn}</h2>
          {renderParameters(reportData)}
        </div>
        <div className="mt-6 flex items-center justify-end gap-4">
          {reportIsGenerated ? (
            <button
              className="btn btn-primary flex items-center gap-2 font-bold rounded inline-flex items-center"
              onClick={() => console.log("Downloading report...")}
            >
              <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span className="text-lg font-bold">Download</span>
            </button>
          ) : (
            <ProgressBar progress={reportGenerationProgress} />
          )}
        </div>
      </article>
    </section>
  );
};

export default SingleProduct;
