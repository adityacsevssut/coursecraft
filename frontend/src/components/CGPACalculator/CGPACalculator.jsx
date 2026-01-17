import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  School,
  Hash,
  BookOpen,
  FlaskConical,
  Plus,
  Minus
} from 'lucide-react';
import { bannerStyles } from '../../assets/dummyStyles';

const CGPACalculator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    collegeName: '',
    numberOfSubjects: 0,
    numberOfLabs: 0
  });

  const [subjects, setSubjects] = useState([]);
  const [labs, setLabs] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('number') ? parseInt(value) || 0 : value
    }));
  };

  const handleSubjectCountChange = (count) => {
    const newCount = Math.max(0, count);
    setFormData(prev => ({ ...prev, numberOfSubjects: newCount }));

    if (newCount > subjects.length) {
      // Add new subjects
      const newSubjects = [];
      for (let i = subjects.length; i < newCount; i++) {
        newSubjects.push({
          id: i,
          name: '',
          credit: '',
          midsemMark: '',
          endsemMark: ''
        });
      }
      setSubjects(prev => [...prev, ...newSubjects]);
    } else if (newCount < subjects.length) {
      // Remove excess subjects
      setSubjects(prev => prev.slice(0, newCount));
    }
  };

  const handleLabCountChange = (count) => {
    const newCount = Math.max(0, count);
    setFormData(prev => ({ ...prev, numberOfLabs: newCount }));

    if (newCount > labs.length) {
      // Add new labs
      const newLabs = [];
      for (let i = labs.length; i < newCount; i++) {
        newLabs.push({
          id: i,
          name: '',
          grade: ''
        });
      }
      setLabs(prev => [...prev, ...newLabs]);
    } else if (newCount < labs.length) {
      // Remove excess labs
      setLabs(prev => prev.slice(0, newCount));
    }
  };

  const handleSubjectChange = (id, field, value) => {
    setSubjects(prev =>
      prev.map(subject =>
        subject.id === id
          ? { ...subject, [field]: value }
          : subject
      )
    );
  };

  const handleLabChange = (id, field, value) => {
    setLabs(prev =>
      prev.map(lab =>
        lab.id === id
          ? { ...lab, [field]: value }
          : lab
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.studentName || !formData.collegeName) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate subjects
    for (let subject of subjects) {
      if (!subject.name || !subject.credit || subject.midsemMark === '' || subject.endsemMark === '') {
        alert('Please fill in all subject details');
        return;
      }
    }

    // Validate labs (if any)
    for (let lab of labs) {
      if (!lab.name || !lab.grade) {
        alert('Please fill in all lab details');
        return;
      }
    }

    // Calculate CGPA and prepare data for result page
    const calculationData = {
      studentName: formData.studentName,
      collegeName: formData.collegeName,
      subjects: subjects.map(subject => {
        const randomMark = Math.floor(Math.random() * 3) + 18; // Random internal marks between 18-20
        const totalMarks = parseInt(subject.midsemMark) + parseInt(subject.endsemMark) + randomMark;
        return {
          ...subject,
          randomMark: randomMark,
          totalMarks: totalMarks,
          grade: calculateGrade(totalMarks)
        };
      }),
      labs: labs,
      cgpa: calculateCGPA(subjects, labs)
    };

    // Store data in localStorage or pass via state
    localStorage.setItem('cgpaCalculationData', JSON.stringify(calculationData));
    navigate('/cgpa-result');
  };

  const calculateGrade = (totalMarks) => {
    if (totalMarks >= 91) return 'O';
    if (totalMarks >= 81) return 'A+';
    if (totalMarks >= 71) return 'A';
    if (totalMarks >= 61) return 'B+';
    if (totalMarks >= 51) return 'B';
    if (totalMarks >= 41) return 'C';
    return 'F';
  };

  const calculateCGPA = (subjects, labs) => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    // Calculate subject grades
    subjects.forEach(subject => {
      const randomMark = Math.floor(Math.random() * 3) + 18; // Random internal marks between 18-20
      const totalMarks = parseInt(subject.midsemMark) + parseInt(subject.endsemMark) + randomMark;
      const grade = calculateGrade(totalMarks);
      const credit = parseFloat(subject.credit);

      let gradePoint = 0;
      switch (grade) {
        case 'O': gradePoint = 10; break;  // Changed from O+ to O
        case 'A+': gradePoint = 9; break;
        case 'A': gradePoint = 8; break;
        case 'B+': gradePoint = 7; break;
        case 'B': gradePoint = 6; break;
        case 'C': gradePoint = 5; break;
        default: gradePoint = 0;
      }

      totalGradePoints += gradePoint * credit;
      totalCredits += credit;
    });

    // Calculate lab grades (assuming 1 credit per lab)
    labs.forEach(lab => {
      let gradePoint = 0;
      switch (lab.grade) {
        case 'O': gradePoint = 10; break;  // Changed from O+ to O
        case 'A+': gradePoint = 9; break;
        case 'A': gradePoint = 8; break;
        case 'B+': gradePoint = 7; break;
        case 'B': gradePoint = 6; break;
        case 'C': gradePoint = 5; break;
        default: gradePoint = 0;
      }

      totalGradePoints += gradePoint * 1; // 1 credit per lab
      totalCredits += 1;
    });

    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 pt-48 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Calculate CGPA
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-lg font-semibold mb-2 text-blue-300">
                  <User className="w-5 h-5 text-blue-500" />
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-lg font-semibold mb-2 text-blue-300">
                  <School className="w-5 h-5 text-purple-500" />
                  College Name
                </label>
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-white"
                  placeholder="Enter your college name"
                  required
                />
              </div>
            </div>

            {/* Subjects Section */}
            <div className="border-t border-gray-700 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center gap-2 text-xl font-bold text-green-400">
                  <BookOpen className="w-6 h-6 text-green-500" />
                  Subjects
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSubjectCountChange(formData.numberOfSubjects - 1)}
                    className="p-2 rounded-full bg-red-900/50 text-red-400 hover:bg-red-800/50 transition-colors"
                    disabled={formData.numberOfSubjects <= 0}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-semibold min-w-[40px] text-center text-gray-300">
                    {formData.numberOfSubjects}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSubjectCountChange(formData.numberOfSubjects + 1)}
                    className="p-2 rounded-full bg-green-900/50 text-green-400 hover:bg-green-800/50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <input
                type="hidden"
                name="numberOfSubjects"
                value={formData.numberOfSubjects}
              />

              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="font-semibold text-lg mb-3 text-gray-300">Subject {subject.id + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-400">Subject Name</label>
                        <input
                          type="text"
                          value={subject.name}
                          onChange={(e) => handleSubjectChange(subject.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700/80 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                          placeholder="Enter subject name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-400">Subject Credit</label>
                        <select
                          value={subject.credit}
                          onChange={(e) => handleSubjectChange(subject.id, 'credit', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700/80 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                          required
                        >
                          <option value="">Select Credit</option>
                          <option value="1">1 Credit</option>
                          <option value="1.5">1.5 Credits</option>
                          <option value="2">2 Credits</option>
                          <option value="3">3 Credits</option>
                          <option value="4">4 Credits</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-400">Midsem Mark (Out of 30)</label>
                        <input
                          type="number"
                          min="0"
                          max="30"
                          value={subject.midsemMark}
                          onChange={(e) => handleSubjectChange(subject.id, 'midsemMark', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700/80 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                          placeholder="Enter midsem marks"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-400">Endsem Mark (Out of 50)</label>
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={subject.endsemMark}
                          onChange={(e) => handleSubjectChange(subject.id, 'endsemMark', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700/80 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                          placeholder="Enter endsem marks"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Labs Section */}
            <div className="border-t border-gray-700 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center gap-2 text-xl font-bold text-orange-400">
                  <FlaskConical className="w-6 h-6 text-orange-500" />
                  Labs
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleLabCountChange(formData.numberOfLabs - 1)}
                    className="p-2 rounded-full bg-red-900/50 text-red-400 hover:bg-red-800/50 transition-colors"
                    disabled={formData.numberOfLabs <= 0}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-semibold min-w-[40px] text-center text-gray-300">
                    {formData.numberOfLabs}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleLabCountChange(formData.numberOfLabs + 1)}
                    className="p-2 rounded-full bg-green-900/50 text-green-400 hover:bg-green-800/50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <input
                type="hidden"
                name="numberOfLabs"
                value={formData.numberOfLabs}
              />

              <div className="space-y-4">
                {labs.map((lab) => (
                  <div key={lab.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="font-semibold text-lg mb-3 text-gray-300">Lab {lab.id + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-400">Lab Name</label>
                        <input
                          type="text"
                          value={lab.name}
                          onChange={(e) => handleLabChange(lab.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700/80 border border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white"
                          placeholder="Enter lab name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-400">Expected Grade</label>
                        <select
                          value={lab.grade}
                          onChange={(e) => handleLabChange(lab.id, 'grade', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700/80 border border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white"
                          required
                        >
                          <option value="">Select Grade</option>
                          <option value="O">O</option>
                          <option value="A+">A+</option>
                          <option value="A">A</option>
                          <option value="B+">B+</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="F">F</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Calculate CGPA
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-700 text-gray-300 py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CGPACalculator;