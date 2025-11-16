import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  TrendingUp,
  Calendar
} from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch teacher dashboard data
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        setTimeout(() => {
          setStats({
            totalStudents: 45,
            totalSubjects: 3,
            averageClassPerformance: 78,
            assignmentsGraded: 23
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  const statCards = [
    {
      icon: Users,
      label: 'Total Students',
      value: stats?.totalStudents || 0,
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      icon: BookOpen,
      label: 'Subjects Teaching',
      value: stats?.totalSubjects || 0,
      color: 'bg-green-500',
      change: 'Math, Science, English'
    },
    {
      icon: BarChart3,
      label: 'Avg Class Performance',
      value: `${stats?.averageClassPerformance || 0}%`,
      color: 'bg-purple-500',
      change: '+5% from last term'
    },
    {
      icon: TrendingUp,
      label: 'Assignments Graded',
      value: stats?.assignmentsGraded || 0,
      color: 'bg-orange-500',
      change: '12 pending'
    }
  ];

  const recentActivities = [
    { action: 'Graded assignments', subject: 'Mathematics', time: '2 hours ago' },
    { action: 'Added new student', subject: 'Science', time: '1 day ago' },
    { action: 'Updated grades', subject: 'English', time: '2 days ago' },
    { action: 'Created new assignment', subject: 'Mathematics', time: '3 days ago' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-blue mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's your teaching overview and recent activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="card hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-blue mb-1">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-gray-600 mb-2">
                {stat.label}
              </p>
              <p className="text-xs text-gray-500">
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-navy-blue">
              Recent Activities
            </h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-royal-blue p-2 rounded-full mt-1">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.subject} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-navy-blue">
              Quick Actions
            </h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition duration-200">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <span className="font-medium text-blue-900">Add Grades</span>
            </button>
            
            <button className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition duration-200">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <span className="font-medium text-green-900">View Students</span>
            </button>
            
            <button className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition duration-200">
              <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <span className="font-medium text-purple-900">Reports</span>
            </button>
            
            <button className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition duration-200">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <span className="font-medium text-orange-900">Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;