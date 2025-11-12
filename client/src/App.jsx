import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import StudentDashboard from './pages/Student/StudentDashboard';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<h2 className="text-center text-xl font-semibold">Welcome to GradeLink</h2>} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
