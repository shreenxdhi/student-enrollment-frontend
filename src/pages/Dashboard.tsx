import { useState, useEffect } from 'react';
import { Users, BookOpen, GraduationCap } from 'lucide-react';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    enrollments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, coursesRes, enrollmentsRes] = await Promise.all([
          api.get('/students/'),
          api.get('/courses/'),
          api.get('/enrollments/')
        ]);

        setStats({
          students: studentsRes.data.length,
          courses: coursesRes.data.length,
          enrollments: enrollmentsRes.data.length
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Students</p>
            <p className="text-2xl font-bold text-gray-900">{stats.students}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <BookOpen className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Courses</p>
            <p className="text-2xl font-bold text-gray-900">{stats.courses}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <GraduationCap className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Enrollments</p>
            <p className="text-2xl font-bold text-gray-900">{stats.enrollments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
