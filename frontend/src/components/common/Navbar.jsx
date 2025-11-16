import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  User, 
  LogOut, 
  Menu, 
  X, 
  GraduationCap,
  BookOpen,
  BarChart3
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const NavLink = ({ to, children, icon: Icon }) => (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition duration-200 ${
        location.pathname === to
          ? 'bg-royal-blue text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
      onClick={() => setIsOpen(false)}
    >
      {Icon && <Icon size={18} />}
      <span>{children}</span>
    </Link>
  );

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-royal-blue p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-navy-blue">Gradelink</h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Where Every Student's Progress Connects
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                {user?.role === 'student' && (
                  <>
                    <NavLink to="/student/dashboard" icon={BarChart3}>
                      Dashboard
                    </NavLink>
                    <NavLink to="/student/results" icon={BookOpen}>
                      Results
                    </NavLink>
                    <NavLink to="/student/profile" icon={User}>
                      Profile
                    </NavLink>
                  </>
                )}
                {user?.role === 'teacher' && (
                  <>
                    <NavLink to="/teacher/dashboard" icon={BarChart3}>
                      Dashboard
                    </NavLink>
                    <NavLink to="/teacher/students" icon={User}>
                      Students
                    </NavLink>
                    <NavLink to="/teacher/grades" icon={BookOpen}>
                      Grades
                    </NavLink>
                  </>
                )}
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
                  >
                    <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                      <User size={16} className="text-navy-blue" />
                    </div>
                    <span className="hidden lg:block">{user?.name}</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition duration-200"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-royal-blue transition duration-200 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-royal-blue transition duration-200 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {isAuthenticated ? (
              <div className="space-y-2">
                {user?.role === 'student' && (
                  <>
                    <NavLink to="/student/dashboard" icon={BarChart3}>
                      Dashboard
                    </NavLink>
                    <NavLink to="/student/results" icon={BookOpen}>
                      Results
                    </NavLink>
                    <NavLink to="/student/profile" icon={User}>
                      Profile
                    </NavLink>
                  </>
                )}
                {user?.role === 'teacher' && (
                  <>
                    <NavLink to="/teacher/dashboard" icon={BarChart3}>
                      Dashboard
                    </NavLink>
                    <NavLink to="/teacher/students" icon={User}>
                      Students
                    </NavLink>
                    <NavLink to="/teacher/grades" icon={BookOpen}>
                      Grades
                    </NavLink>
                  </>
                )}
                <div className="pt-2 border-t border-gray-200">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 bg-royal-blue text-white rounded-lg text-center transition duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;