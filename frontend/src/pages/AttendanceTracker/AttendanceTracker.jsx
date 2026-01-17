import React, { useState, useEffect } from 'react';
import { Plus, Calendar, User, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser, useClerk } from '@clerk/clerk-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const AttendanceTracker = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser(); // Check authentication
  const { openSignIn } = useClerk(); // For redirecting to sign-in
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isSignedIn === false) {
      openSignIn({
        afterSignInUrl: '/attendance-tracker',
        signUpUrl: '/sign-up'
      });
      return;
    }
  }, [isSignedIn, openSignIn]);

  // Load subjects from backend on component mount (only if authenticated)
  useEffect(() => {
    if (!isSignedIn) return; // Don't load if not authenticated

    const fetchSubjects = async () => {
      try {
        const userId = user?.id || localStorage.getItem('userId') || 'demo-user';
        const response = await axios.get(`http://localhost:4000/api/attendance/${userId}`);
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        // Fallback to localStorage if API fails
        const savedSubjects = localStorage.getItem('attendanceSubjects');
        if (savedSubjects) {
          setSubjects(JSON.parse(savedSubjects));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [isSignedIn, user]);

  // Calculate attendance percentage
  const calculateAttendance = (present, total) => {
    if (total === 0) return 0;
    return Math.round((present / total) * 100);
  };

  // Handle clicking on a subject card
  const handleCardClick = (subjectId) => {
    navigate(`/attendance-result/${subjectId}`);
  };

  // Render content based on whether subjects exist
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-32">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-6"></div>
          <p className="text-gray-400 text-xl">Loading subjects...</p>
        </div>
      );
    }

    if (subjects.length === 0) {
      // Centered content when no subjects exist - including header
      return (
        <div className="flex flex-col items-center justify-start min-h-screen text-center pt-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
            Attendance Tracker
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl">
            Track your attendance across all subjects
          </p>

          <GraduationCap className="w-20 h-20 text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-300 mb-3">No subjects added yet</h2>
          <p className="text-gray-500 text-lg mb-6 max-w-md">
            Start tracking your attendance by adding your first subject
          </p>
          <button
            onClick={() => navigate('/attendance-form')}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl text-lg"
          >
            <Plus className="w-5 h-5" />
            Add Your First Subject
          </button>
        </div>
      );
    }

    // Grid layout when subjects exist
    return (
      <>
        {/* Header when subjects exist */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Attendance Tracker
          </h1>
          <p className="text-gray-400 text-lg">
            Track your attendance across all subjects
          </p>
        </div>

        {/* Top-right Add Subject button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => navigate('/attendance-form')}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Add Subject
          </button>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const attendancePercentage = calculateAttendance(subject.presentClasses, subject.totalClasses);

            // Determine status based on percentage
            let statusColor = '';
            let statusText = '';
            if (attendancePercentage < 75) {
              statusColor = 'text-red-400 bg-red-900/30 border-red-700/50';
              statusText = 'Danger Zone';
            } else if (attendancePercentage >= 75 && attendancePercentage < 80) {
              statusColor = 'text-yellow-400 bg-yellow-900/30 border-yellow-700/50';
              statusText = 'Low Risk';
            } else if (attendancePercentage >= 80 && attendancePercentage <= 100) {
              statusColor = 'text-green-400 bg-green-900/30 border-green-700/50';
              statusText = 'Excellent!';
            }

            return (
              <div
                key={subject._id || subject.id}
                onClick={() => handleCardClick(subject._id || subject.id)}
                className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-900/50 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">{subject.subjectName}</h3>
                      <p className="text-sm text-gray-400">{subject.collegeName}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Student:</span>
                    <span className="text-sm font-medium text-white">{subject.studentName}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Classes:</span>
                    <span className="text-sm font-medium text-white">
                      {subject.presentClasses}/{subject.totalClasses}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-300">Attendance</span>
                    <span className="text-sm font-bold text-white">{attendancePercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${attendancePercentage < 75 ? 'bg-red-500' :
                        attendancePercentage >= 75 && attendancePercentage < 80 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                      style={{ width: `${attendancePercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className={`text-center py-2 px-3 rounded-lg border ${statusColor}`}>
                  <span className="text-sm font-semibold">{statusText}</span>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 pt-24 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          {renderContent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AttendanceTracker;