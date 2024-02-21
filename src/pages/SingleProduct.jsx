import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { IoMdDoneAll } from "react-icons/io";

const SingleProduct = () => {
  const [reportGenerationProgress, setReportGenerationProgress] = useState(0);
  const reportIsGenerated = reportGenerationProgress >= 100;

  const reportData = {
    id: "id_1708555164474",
    parameters: {
      dateRange: "2022-08-01 to 2022-09-01",
      userName: "User Name",
      title: "Avant-garde Lamp",
      prices: ["17999", "18999", "16999"],
      category: "Kids",
      shipping: "Etsy",
      feature: "N/A",
    },
  };

  const generatedOn = new Date(
    parseInt(reportData.id.split("_")[1])
  ).toLocaleDateString();

  useEffect(() => {
    const interval = setInterval(() => {
      setReportGenerationProgress((prevProgress) => {
        const nextProgress = prevProgress + 10;
        if (nextProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return nextProgress;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderParameters = (parameters) => {
    return Object.entries(parameters).map(([key, value]) => (
      <div
        key={key}
        className="flex flex-col sm:flex-row justify-between text-lg mt-2"
      >
        <span className="font-semibold capitalize">
          {key.replace(/([A-Z])/g, " $1").trim()}:
        </span>
        <span>{Array.isArray(value) ? value.join(", ") : value}</span>
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
          <li>Report ID: {reportData.id}</li>
        </ul>
      </div>
      <article className="mt-6 bg-white shadow rounded-lg overflow-hidden p-12">
        <h1 className="text-2xl font-bold mb-4">Report Details</h1>
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">
            Generated on: {generatedOn}
          </h2>
          {renderParameters(reportData.parameters)}
        </div>
        <div className="mt-6 flex items-center justify-end gap-4">
          {reportIsGenerated ? (
            <IoMdDoneAll size="2em" className="text-black-500" />
          ) : (
            <ProgressBar progress={reportGenerationProgress} />
          )}
          <button
            className="btn btn-primary"
            disabled={!reportIsGenerated}
            onClick={() => console.log("Downloading report...")}
          >
            {reportIsGenerated ? "Download Report" : "Generating..."}
          </button>
        </div>
      </article>
    </section>
  );
};

export default SingleProduct;
