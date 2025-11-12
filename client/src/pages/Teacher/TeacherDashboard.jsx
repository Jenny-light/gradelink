import React, { useState, useEffect } from 'react';
import API from '../../services/api';

export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ student: '', subject: '', session: '', term: '', ca: 0, exam: 0 });

  useEffect(() => {
    API.get('/users/students').then(res => setStudents(res.data)).catch(console.error);
    API.get('/subjects').then(res => setSubjects(res.data)).catch(console.error);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await API.post('/results', form);
    alert('Result saved ✅');
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="mb-4 text-lg font-semibold">Enter Results</h3>
      <form onSubmit={submit} className="space-y-4">
        <select value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} className="w-full p-2 border rounded">
          <option value="">Select Student</option>
          {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>

        <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full p-2 border rounded">
          <option value="">Select Subject</option>
          {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>

        <input placeholder="Session (e.g. 2024/2025)" value={form.session} onChange={(e) => setForm({ ...form, session: e.target.value })} className="w-full p-2 border rounded" />
        <input placeholder="Term (e.g. 1st Term)" value={form.term} onChange={(e) => setForm({ ...form, term: e.target.value })} className="w-full p-2 border rounded" />
        <input placeholder="CA Score" type="number" value={form.ca} onChange={(e) => setForm({ ...form, ca: e.target.value })} className="w-full p-2 border rounded" />
        <input placeholder="Exam Score" type="number" value={form.exam} onChange={(e) => setForm({ ...form, exam: e.target.value })} className="w-full p-2 border rounded" />
        <button className="bg-primary text-white w-full p-2 rounded">Save Result</button>
      </form>
    </div>
  );
}
