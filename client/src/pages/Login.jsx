import React from "react";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h2 className="text-2xl font-semibold mb-4">Welcome to GradeLink</h2>
      <form className="bg-white shadow-lg rounded-lg p-6 w-80">
        <label className="block mb-2 text-gray-700">Email</label>
        <input
          type="email"
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder="Enter your email"
        />
        <label className="block mb-2 text-gray-700">Password</label>
        <input
          type="password"
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder="Enter your password"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
