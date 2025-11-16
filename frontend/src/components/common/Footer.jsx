import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gold p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-navy-blue" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Gradelink</h2>
                <p className="text-gold text-sm">Where Every Student's Progress Connects</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Streamlining educational management with our comprehensive platform for students, 
              teachers, and administrators. Track progress, manage grades, and foster academic excellence.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone size={16} />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail size={16} />
                <span className="text-sm">support@gradelink.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-gold transition duration-200">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-gold transition duration-200">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition duration-200">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition duration-200">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 Gradelink. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <MapPin size={16} className="text-gray-300" />
            <span className="text-gray-300 text-sm">San Francisco, California</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;