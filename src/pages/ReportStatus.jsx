import React from "react";
import profileData from "../assets/profile.json";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { users } = profileData;

  return (
    <section className="mt-6 bg-white container mx-auto shadow rounded-lg overflow-hidden p-12">
      <h1 className="text-3xl font-semibold mb-6">User Reports</h1>
      {users.map((user) => (
        <div key={user.userId} className="mb-8">
          <h2 className="text-2xl font-bold">{user.userName}</h2>
          <p>Reports Requested: {user.reportsRequested}</p>
          {user.reports.map((report) => (
            <div key={report.id} className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold">Report ID: {report.id}</h3>
              {Object.entries(report.metadata).map(([key, value]) => (
                <div key={key} className="mt-2">
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                  {Array.isArray(value) ? value.join(", ") : value}
                </div>
              ))}
              {/* Link button to the single report page */}
              <div className="mt-6">
                <Link
                  to={`/reports/${report.id}`}
                  className="btn btn-primary hover:bg-red-400 items-center"
                >
                  View Report
                </Link>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default ProfilePage;
