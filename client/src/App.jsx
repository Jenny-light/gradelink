import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import StudentDashboard from './pages/Student/StudentDashboard';
import Header from './components/Header';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </div>
  );
}