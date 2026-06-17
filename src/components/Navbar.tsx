import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Users, MessageSquare, LayoutDashboard, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-white border-r border-gray-200 px-4 py-6 flex flex-col">
        <div className="flex items-center space-x-3 px-2 mb-8 text-blue-600">
          <GraduationCap className="h-8 w-8" />
          <span className="text-xl font-bold">EnrollPortal</span>
        </div>

        <div className="flex-1 space-y-2">
          <Link to="/dashboard" className="flex items-center space-x-3 px-2 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/students" className="flex items-center space-x-3 px-2 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors">
            <Users className="h-5 w-5" />
            <span className="font-medium">Students</span>
          </Link>
          <Link to="/courses" className="flex items-center space-x-3 px-2 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors">
            <BookOpen className="h-5 w-5" />
            <span className="font-medium">Courses</span>
          </Link>
          <Link to="/enrollments" className="flex items-center space-x-3 px-2 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors">
            <GraduationCap className="h-5 w-5" />
            <span className="font-medium">Enrollments</span>
          </Link>
          <Link to="/advisor" className="flex items-center space-x-3 px-2 py-2.5 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors">
            <MessageSquare className="h-5 w-5" />
            <span className="font-medium">AI Advisor</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-2 py-2.5 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
