import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  School,
  BookOpen,
  FlaskConical,
  RotateCcw,
  Home
} from 'lucide-react';
import { bannerStyles } from '../../assets/dummyStyles';

const CGPAResult = () => {
  const navigate = useNavigate();
  const [calculationData, setCalculationData] = useState(null);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem('cgpaCalculationData');
    if (storedData) {
      setCalculationData(JSON.parse(storedData));
    } else {
      // If no data, redirect to calculator
      navigate('/calculate-cgpa');
    }
  }, [navigate]);

  if (!calculationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading results...</p>
        </div>
      </div>
    );
  }

  const { studentName, collegeName, subjects, labs, cgpa } = calculationData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 pt-24 pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700">
          {/* Header */}
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CGPA Result
          </h1>

          {/* Student Information */}
          <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
              <User className="w-6 h-6 text-blue-500" />
              Student Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-semibold text-gray-300">Name:</span>
                <span className="ml-2 text-gray-200">{studentName}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300">College:</span>
                <span className="ml-2 text-gray-200">{collegeName}</span>
              </div>
            </div>
          </div>

          {/* Subjects Table */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-green-500" />
              Subjects
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800/80">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Subject Name
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Midsem Marks
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Endsem Marks
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Internal Marks (Random)
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Total Marks
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/60 divide-y divide-gray-700">
                  {subjects.map((subject, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-800/60' : 'bg-gray-900/60'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                        {subject.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                        {subject.midsemMark}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                        {subject.endsemMark}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
                        {subject.randomMark}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 text-center font-semibold">
                        {subject.totalMarks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${subject.grade === 'O' ? 'bg-green-900/50 text-green-400 border border-green-700' :
                          subject.grade === 'A+' ? 'bg-blue-900/50 text-blue-400 border border-blue-700' :
                            subject.grade === 'A' ? 'bg-indigo-900/50 text-indigo-400 border border-indigo-700' :
                              subject.grade === 'B+' ? 'bg-purple-900/50 text-purple-400 border border-purple-700' :
                                subject.grade === 'B' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-700' :
                                  subject.grade === 'C' ? 'bg-orange-900/50 text-orange-400 border border-orange-700' :
                                    'bg-red-900/50 text-red-400 border border-red-700'
                          }`}>
                          {subject.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Labs Table (if any) */}
          {labs && labs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-orange-500" />
                Labs
              </h2>
              <div className="overflow-x-auto rounded-lg border border-gray-700">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800/80">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                        Lab Name
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-blue-300 uppercase tracking-wider">
                        Expected Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800/60 divide-y divide-gray-700">
                    {labs.map((lab, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-800/60' : 'bg-gray-900/60'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                          {lab.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${lab.grade === 'O' ? 'bg-green-900/50 text-green-400 border border-green-700' :
                            lab.grade === 'A+' ? 'bg-blue-900/50 text-blue-400 border border-blue-700' :
                              lab.grade === 'A' ? 'bg-indigo-900/50 text-indigo-400 border border-indigo-700' :
                                lab.grade === 'B+' ? 'bg-purple-900/50 text-purple-400 border border-purple-700' :
                                  lab.grade === 'B' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-700' :
                                    lab.grade === 'C' ? 'bg-orange-900/50 text-orange-400 border border-orange-700' :
                                      'bg-red-900/50 text-red-400 border border-red-700'
                            }`}>
                            {lab.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Final CGPA Display */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 shadow-2xl border border-blue-700/50">
              <h2 className="text-2xl font-bold text-blue-300 mb-2">Final CGPA</h2>
              <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                {cgpa}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                localStorage.removeItem('cgpaCalculationData');
                navigate('/calculate-cgpa');
              }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              <RotateCcw className="w-5 h-5" />
              Calculate Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 bg-gray-700 text-gray-300 py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-all"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CGPAResult;