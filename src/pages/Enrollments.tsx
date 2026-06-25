import type React from 'react';
import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../services/api';
import type { Enrollment, Student, Course } from '../types';

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    student_id: '',
    course_id: ''
  });

  const fetchData = async () => {
    try {
      const [enrollRes, studentRes, courseRes] = await Promise.all([
        api.get('/enrollments/'),
        api.get('/students/'),
        api.get('/courses/')
      ]);
      setEnrollments(enrollRes.data);
      setStudents(studentRes.data);
      setCourses(courseRes.data);
    } catch (error) {
      console.error('Error fetching data for enrollments', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/enrollments/', {
        student_id: parseInt(formData.student_id),
        course_id: parseInt(formData.course_id)
      });
      setFormData({ student_id: '', course_id: '' });
      fetchData();
    } catch (error) {
      console.error('Error enrolling student', error);
      alert('Failed to enroll student. They might already be enrolled in this course.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to remove this enrollment?')) {
      try {
        await api.delete(`/enrollments/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting enrollment', error);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Enrollments</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-medium mb-4">Enroll a Student</h2>
        <form onSubmit={handleEnroll} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Student</label>
            <select
              required
              value={formData.student_id}
              onChange={(e) => setFormData({...formData, student_id: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">-- Choose Student --</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.first_name} {s.last_name} ({s.student_id})</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
            <select
              required
              value={formData.course_id}
              onChange={(e) => setFormData({...formData, course_id: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">-- Choose Course --</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.course_code} - {c.course_name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 h-[42px] w-full md:w-auto mt-2 md:mt-0">
            Enroll
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {enrollment.student.first_name} {enrollment.student.last_name}
                    </div>
                    <div className="text-sm text-gray-500">{enrollment.student.student_id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{enrollment.course.course_code}</div>
                    <div className="text-sm text-gray-500">{enrollment.course.course_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(enrollment.enrollment_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDelete(enrollment.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-5 w-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {enrollments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No enrollments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Enrollments;
