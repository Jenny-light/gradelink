import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { api, endpoints } from '../../utils/api';
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  Calendar,
  BarChart3
} from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentGrades, setRecentGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // In a real app, you'd have a dedicated dashboard endpoint
        // For now, we'll fetch student data and grades separately
        const studentResponse = await api.get(endpoints.students.list);
        const student = studentResponse.data.data.students.find(s => s.user._id === user.id);
        
        if (student) {
          const gradesResponse = await api.get(endpoints.students.grades(student._id));
          const grades = gradesResponse.data.data.grades;
          
          // Calculate stats
          const totalSubjects = grades.length;
          const averageMarks = grades.reduce((sum, grade) => sum + grade.marks, 0) / totalSubjects || 0;
          const averageGPA = grades.reduce((sum, grade) => sum + grade.gpa, 0) / totalSubjects || 0;
          
          setStats({
            totalSubjects,
            averageMarks: Math.round(averageMarks),
            averageGPA: averageGPA.toFixed(2),
            attendance: '95%' // This would come from attendance data
          });
          
          setRecentGrades(grades.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  const statCards = [
    {
      icon: BookOpen,
      label: 'Total Subjects',
      value: stats?.totalSubjects || 0,
      color: 'bg-blue-500'
    },
    {
      icon: Award,
      label: 'Average Marks',
      value: `${stats?.averageMarks || 0}%`,
      color: 'bg-green-500'
    },
    {
      icon: TrendingUp,
      label: 'Average GPA',
      value: stats?.averageGPA || '0.0',
      color: 'bg-purple-500'
    },
    {
      icon: Calendar,
      label: 'Attendance',
      value: stats?.attendance || '0%',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-blue mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's your academic overview for this semester.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-navy-blue">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Grades */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-navy-blue">
              Recent Grades
            </h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentGrades.length > 0 ? (
              recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {grade.subject?.subjectName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {grade.term} • {grade.academicYear}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      grade.marks >= 80 ? 'text-green-600' :
                      grade.marks >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {grade.marks}%
                    </p>
                    <p className="text-sm text-gray-500">
                      {grade.grade} ({grade.gpa} GPA)
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No grades available yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-navy-blue">
              Performance Summary
            </h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Overall Performance</h3>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats?.averageMarks || 0}%` }}
                ></div>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                {stats?.averageMarks || 0}% average across all subjects
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">GPA Progress</h3>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-green-700">
                  {stats?.averageGPA || '0.0'}
                </div>
                <span className="text-sm text-green-600">out of 4.0</span>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-900 mb-2">Attendance</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-700">
                  {stats?.attendance || '0%'}
                </span>
                <span className="text-sm text-purple-600">This semester</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;