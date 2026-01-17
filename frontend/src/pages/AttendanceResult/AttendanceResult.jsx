import React, { useState, useEffect } from 'react';
import { User, GraduationCap, Calendar, RotateCcw, Home, TrendingUp, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser, useClerk } from '@clerk/clerk-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const AttendanceResult = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isSignedIn } = useUser(); // Check authentication
  const { openSignIn } = useClerk(); // For redirecting to sign-in
  const [subject, setSubject] = useState(null);
  const [presentClasses, setPresentClasses] = useState(0);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isSignedIn === false) {
      openSignIn({
        afterSignInUrl: `/attendance-result/${id}`,
        signUpUrl: '/sign-up'
      });
      return;
    }
  }, [isSignedIn, openSignIn, id]);

  // Load subject data (only if authenticated)
  useEffect(() => {
    if (!isSignedIn) return; // Don't load if not authenticated

    const fetchSubject = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/attendance/single/${id}`);
        const data = response.data;
        setSubject(data);
        setPresentClasses(data.presentClasses || 0);
      } catch (error) {
        console.error('Error fetching subject:', error);
        // Fallback to localStorage if API fails
        const subjects = JSON.parse(localStorage.getItem('attendanceSubjects')) || [];
        const foundSubject = subjects.find(sub => sub.id === id);
        if (foundSubject) {
          setSubject(foundSubject);
          setPresentClasses(foundSubject.presentClasses || 0);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [id, isSignedIn]);

  // Handle updating present classes
  const handlePresentChange = async (value) => {
    const newValue = Math.max(0, Math.min(value, subject?.totalClasses || 0));
    setPresentClasses(newValue);

    try {
      // Update in backend
      await axios.put(`http://localhost:4000/api/attendance/${subject._id || subject.id}`, {
        presentClasses: newValue
      });

      // Update subject state
      setSubject(prev => ({
        ...prev,
        presentClasses: newValue
      }));
    } catch (error) {
      console.error('Error updating attendance:', error);
      // Fallback to localStorage if API fails
      const subjects = JSON.parse(localStorage.getItem('attendanceSubjects')) || [];
      const updatedSubjects = subjects.map(sub =>
        sub.id === id ? { ...sub, presentClasses: newValue } : sub
      );
      localStorage.setItem('attendanceSubjects', JSON.stringify(updatedSubjects));
    }
  };

  // Handle deleting the subject
  const handleDeleteSubject = async () => {
    if (window.confirm('Are you sure you want to delete this subject? This action cannot be undone.')) {
      try {
        await axios.delete(`http://localhost:4000/api/attendance/${subject._id || subject.id}`);
        // Redirect to subjects list after deletion
        navigate('/attendance-tracker');
      } catch (error) {
        console.error('Error deleting subject:', error);
        alert('Error deleting subject. Please try again.');
      }
    }
  };

  if (!subject || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">{loading ? 'Loading subject...' : 'Subject not found'}</p>
        </div>
      </div>
    );
  }

  // Calculate attendance percentage
  const attendancePercentage = subject.totalClasses > 0
    ? Math.round((presentClasses / subject.totalClasses) * 100)
    : 0;

  // Determine status based on percentage
  let statusColor = '';
  let statusText = '';
  let compliment = '';

  if (attendancePercentage < 75) {
    statusColor = 'text-red-400 bg-red-900/30 border-red-700/50';
    statusText = 'Danger Zone - Attendance below 75%';
  } else if (attendancePercentage >= 75 && attendancePercentage < 80) {
    statusColor = 'text-yellow-400 bg-yellow-900/30 border-yellow-700/50';
    statusText = 'Low Risk - Attendance needs improvement';
  } else if (attendancePercentage >= 80 && attendancePercentage <= 100) {
    statusColor = 'text-green-400 bg-green-900/30 border-green-700/50';
    statusText = 'Safe Zone - Good attendance!';

    // Compliments for 80-100%
    if (attendancePercentage >= 95) {
      compliment = 'Outstanding attendance! Keep up the excellent work!';
    } else if (attendancePercentage >= 90) {
      compliment = 'Fantastic job! Your attendance is impressive!';
    } else if (attendancePercentage >= 85) {
      compliment = 'Great work! You have excellent attendance!';
    } else if (attendancePercentage >= 80) {
      compliment = 'Good job! Keep maintaining your attendance!';
    }
  }

  // Calculate remaining classes to attend
  const minRequiredPresent = Math.ceil(subject.totalClasses * 0.75); // 75% requirement
  const remainingToAttend = minRequiredPresent - presentClasses;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 pt-24 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700">
            {/* Header */}
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Attendance Dashboard
            </h1>

            {/* Subject Information */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
              <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-500" />
                Subject Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-gray-300">Subject:</span>
                  <span className="ml-2 text-gray-200 font-medium">{subject.subjectName}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Student:</span>
                  <span className="ml-2 text-gray-200 font-medium">{subject.studentName}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-300">College:</span>
                  <span className="ml-2 text-gray-200 font-medium">{subject.collegeName}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Start Date:</span>
                  <span className="ml-2 text-gray-200 font-medium">{new Date(subject.startDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Attendance Controls */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
              <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-500" />
                Attendance Tracking
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Present Classes: {presentClasses} / {subject.totalClasses}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handlePresentChange(presentClasses - 1)}
                      disabled={presentClasses <= 0}
                      className="p-2 bg-red-900/50 text-red-400 hover:bg-red-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={presentClasses}
                      onChange={(e) => handlePresentChange(parseInt(e.target.value) || 0)}
                      min="0"
                      max={subject.totalClasses}
                      className="flex-1 px-4 py-2 bg-gray-700/80 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white text-center"
                    />
                    <button
                      onClick={() => handlePresentChange(presentClasses + 1)}
                      disabled={presentClasses >= subject.totalClasses}
                      className="p-2 bg-green-900/50 text-green-400 hover:bg-green-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Attendance Percentage
                  </label>
                  <div className="text-center">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      {attendancePercentage}%
                    </div>
                    <div className={`text-sm font-semibold py-1 px-3 rounded-lg border ${statusColor}`}>
                      {statusText}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">Progress</span>
                <span className="text-sm font-bold text-white">{attendancePercentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${attendancePercentage < 75 ? 'bg-red-500' :
                    attendancePercentage >= 75 && attendancePercentage < 80 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                  style={{ width: `${Math.min(attendancePercentage, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Compliment Box for High Attendance */}
            {compliment && (
              <div className="mb-8 bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-6 border border-green-700/50">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-green-400 mb-2">Great Job!</h3>
                    <p className="text-green-300">{compliment}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Status Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h3 className="font-semibold text-gray-300 mb-2">Attendance Status</h3>
                <div className={`text-sm font-semibold py-2 px-3 rounded-lg border ${statusColor}`}>
                  {statusText}
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h3 className="font-semibold text-gray-300 mb-2">Remaining to Safe Zone</h3>
                <div className="text-lg font-bold text-white">
                  {remainingToAttend > 0 ? `${remainingToAttend} classes to reach 75%` : '✓ Safe Zone Achieved'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/attendance-tracker')}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Home className="w-5 h-5" />
                Back to Subjects
              </button>
              <button
                onClick={() => navigate('/attendance-form')}
                className="flex items-center justify-center gap-2 bg-gray-700 text-gray-300 py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                Add Another Subject
              </button>
              <button
                onClick={handleDeleteSubject}
                className="flex items-center justify-center gap-2 bg-red-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-800 transition-all"
              >
                <Trash2 className="w-5 h-5" />
                Delete Subject
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AttendanceResult;