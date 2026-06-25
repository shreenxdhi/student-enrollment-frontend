import { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Users, MessageSquare, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 z-30 relative">
        <div className="flex items-center space-x-2 text-blue-600">
          <GraduationCap className="h-6 w-6" />
          <span className="text-lg font-bold">EnrollPortal</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar Navigation */}
      <nav className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 px-4 py-6 flex flex-col transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div className="hidden md:flex items-center space-x-3 px-2 mb-8 text-blue-600">
          <GraduationCap className="h-8 w-8" />
          <span className="text-xl font-bold">EnrollPortal</span>
        </div>

        <div className="flex-1 space-y-2 mt-4 md:mt-0">
          <Link to="/dashboard" onClick={closeMobileMenu} className="flex items-center space-x-3 px-2 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/students" onClick={closeMobileMenu} className="flex items-center space-x-3 px-2 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors">
            <Users className="h-5 w-5" />
            <span className="font-medium">Students</span>
          </Link>
          <Link to="/courses" onClick={closeMobileMenu} className="flex items-center space-x-3 px-2 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors">
            <BookOpen className="h-5 w-5" />
            <span className="font-medium">Courses</span>
          </Link>
          <Link to="/enrollments" onClick={closeMobileMenu} className="flex items-center space-x-3 px-2 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors">
            <GraduationCap className="h-5 w-5" />
            <span className="font-medium">Enrollments</span>
          </Link>
          <Link to="/advisor" onClick={closeMobileMenu} className="flex items-center space-x-3 px-2 py-2.5 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors">
            <MessageSquare className="h-5 w-5" />
            <span className="font-medium">AI Advisor</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-gray-200 mt-auto">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-2 py-2.5 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 md:p-8 overflow-x-hidden overflow-y-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
