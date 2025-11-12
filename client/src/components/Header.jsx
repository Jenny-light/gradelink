import React from "react";
import { Link } from "react-router-dom";
import logo from "/logo.png"; // ✅ Vite serves public folder from root

export default function Header() {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={logo} alt="GradeLink Logo" className="h-10 w-10" />
        <h1 className="text-xl font-bold text-gray-800">GradeLink</h1>
      </div>
      <nav className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
          Login
        </Link>
        <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
          Admin
        </Link>
        <Link to="/teacher" className="text-gray-700 hover:text-blue-600 font-medium">
          Teacher
        </Link>
        <Link to="/student" className="text-gray-700 hover:text-blue-600 font-medium">
          Student
        </Link>
      </nav>
    </header>
  );
}
