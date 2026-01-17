import React, { useState, useEffect } from 'react';
import { User, GraduationCap, Calendar, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser, useClerk } from '@clerk/clerk-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const AttendanceForm = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser(); // Check authentication
  const { openSignIn } = useClerk(); // For redirecting to sign-in
  const [formData, setFormData] = useState({
    studentName: '',
    subjectName: '',
    totalClasses: '',
    startDate: ''
  });
  const [loading, setLoading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isSignedIn === false) {
      openSignIn({
        afterSignInUrl: '/attendance-form',
        signUpUrl: '/sign-up'
      });
      return;
    }
  }, [isSignedIn, openSignIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.studentName || !formData.subjectName || !formData.totalClasses || !formData.startDate) {
      alert('Please fill in all fields');
      return;
    }

    if (parseInt(formData.totalClasses) <= 0) {
      alert('Total classes must be greater than 0');
      return;
    }

    setLoading(true);

    try {
      // Prepare data
      const attendanceData = {
        studentName: formData.studentName,
        subjectName: formData.subjectName,
        totalClasses: parseInt(formData.totalClasses),
        startDate: formData.startDate,
        collegeName: 'CourseCraft University', // Default college name
        userId: user?.id || localStorage.getItem('userId') || 'demo-user'
      };

      // Send to backend
      await axios.post('http://localhost:4000/api/attendance', attendanceData);

      // Optionally clear localStorage cache if we were using it
      // localStorage.removeItem('attendanceSubjects');

      // Redirect to subject listing
      navigate('/attendance-tracker');
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('Error saving subject. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 pt-24 pb-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Add New Subject
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Name */}
              <div>
                <label className="flex items-center gap-2 text-lg font-semibold mb-2 text-blue-300">
                  <User className="w-5 h-5 text-blue-500" />
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Subject Name */}
              <div>
                <label className="flex items-center gap-2 text-lg font-semibold mb-2 text-blue-300">
                  <GraduationCap className="w-5 h-5 text-purple-500" />
                  Subject Name
                </label>
                <input
                  type="text"
                  name="subjectName"
                  value={formData.subjectName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-white"
                  placeholder="Enter subject name"
                  required
                />
              </div>

              {/* Total Classes */}
              <div>
                <label className="flex items-center gap-2 text-lg font-semibold mb-2 text-blue-300">
                  <Calendar className="w-5 h-5 text-green-500" />
                  Total Classes
                </label>
                <input
                  type="number"
                  name="totalClasses"
                  value={formData.totalClasses}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-white"
                  placeholder="Enter total number of classes"
                  required
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="flex items-center gap-2 text-lg font-semibold mb-2 text-blue-300">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  Class Starting Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-white"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Saving...
                    </div>
                  ) : (
                    <div>
                      <GraduationCap className="w-5 h-5" />
                      Save Subject
                    </div>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/attendance-tracker')}
                  className="flex-1 bg-gray-700 text-gray-300 py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AttendanceForm;