import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Shield, 
  BookOpen,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Grade Management',
      description: 'Easily upload, track, and manage student grades with our intuitive interface.'
    },
    {
      icon: Users,
      title: 'Student Analytics',
      description: 'Visualize student progress with detailed charts and performance metrics.'
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Role-based access ensures data security and privacy for all users.'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Reporting',
      description: 'Generate detailed reports and transcripts with just a few clicks.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Students' },
    { number: '500+', label: 'Teachers' },
    { number: '50+', label: 'Schools' },
    { number: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="bg-gold p-4 rounded-xl w-16 h-16 mx-auto flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-navy-blue" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to{' '}
              <span className="text-gold">Gradelink</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gold mb-8 max-w-3xl mx-auto leading-relaxed">
              Where Every Student's Progress Connects
            </p>
            
            <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Streamline educational management with our comprehensive platform for students, 
              teachers, and administrators. Track progress, manage grades, and foster academic excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/register" 
                className="btn-secondary text-lg px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 group"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/login" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-navy-blue transition duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-navy-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-blue mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage educational institutions efficiently and effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card group hover:shadow-lg transition duration-300">
                <div className="bg-royal-blue w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy-blue mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gold">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">
            Ready to Transform Education?
          </h2>
          <p className="text-lg text-navy-blue mb-8 max-w-2xl mx-auto">
            Join thousands of educators and students using Gradelink to enhance learning outcomes and streamline administrative tasks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-navy-blue text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-royal-blue transition duration-300"
            >
              Create Your Account
            </Link>
            <a 
              href="#features" 
              className="border-2 border-navy-blue text-navy-blue px-8 py-4 rounded-xl font-semibold text-lg hover:bg-navy-blue hover:text-white transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;