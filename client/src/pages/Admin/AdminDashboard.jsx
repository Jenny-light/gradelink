import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const [studentRes, resultRes] = await Promise.all([
          axios.get("http://localhost:5000/api/students"),
          axios.get("http://localhost:5000/api/results"),
        ]);
        setStudents(studentRes.data);
        setResults(resultRes.data);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading Dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-600">Total Students</h2>
          <p className="text-2xl font-bold text-green-700">{students.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-600">Total Results</h2>
          <p className="text-2xl font-bold text-green-700">{results.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-600">Performance Avg.</h2>
          <p className="text-2xl font-bold text-green-700">
            {results.length > 0
              ? Math.round(
                  results.reduce((acc, r) => acc + (r.ca + r.exam) / 2, 0) /
                    results.length
                )
              : 0}
            %
          </p>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold text-green-800 mb-4">Students List</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-800 text-white">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Class</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id} className="border-b hover:bg-gray-100">
                <td className="p-2">{s.name}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">{s.class}</td>
                <td className="p-2">
                  <span className="text-green-700 font-semibold">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
