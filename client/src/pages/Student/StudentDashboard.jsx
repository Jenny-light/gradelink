import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentDashboard() {
  const [results, setResults] = useState([]);
  const [student, setStudent] = useState({});
  const studentId = "64f8e7f4c9a01b123456abcd"; // TODO: Replace with dynamic ID (from login token)

  useEffect(() => {
    async function fetchData() {
      try {
        const studentRes = await axios.get(`http://localhost:5000/api/students/${studentId}`);
        const resultRes = await axios.get(`http://localhost:5000/api/results/student/${studentId}`);
        setStudent(studentRes.data);
        setResults(resultRes.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }
    fetchData();
  }, [studentId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Welcome, {student.name}
      </h1>

      {/* Student Info */}
      <div className="bg-white p-4 rounded-xl shadow mb-8">
        <h2 className="text-lg font-bold text-green-700 mb-2">Profile</h2>
        <p><strong>Class:</strong> {student.class}</p>
        <p><strong>Email:</strong> {student.email}</p>
      </div>

      {/* Results */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold text-green-700 mb-4">Results</h2>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-green-800 text-white">
              <th className="p-2">Subject</th>
              <th className="p-2">CA</th>
              <th className="p-2">Exam</th>
              <th className="p-2">Average</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r._id} className="border-b hover:bg-gray-100">
                <td className="p-2">{r.subjectName}</td>
                <td className="p-2">{r.ca}</td>
                <td className="p-2">{r.exam}</td>
                <td className="p-2 font-bold text-green-700">
                  {(r.ca + r.exam) / 2}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
