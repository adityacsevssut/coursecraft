import Attendance from '../models/attendanceModel.js';
import { cachedAsync, cacheMiddleware, invalidateCache } from '../utils/cache.js';

// Get all attendance records for a user
const getAllAttendance = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Create cache key
    const cacheKey = `attendance_${userId}`;
    
    const result = await cachedAsync(cacheKey, async () => {
      return await Attendance.find({ userId }).sort({ createdAt: -1 });
    }, 5 * 60 * 1000); // Cache for 5 minutes
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific attendance record
const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Create cache key
    const cacheKey = `attendance_single_${id}`;
    
    const result = await cachedAsync(cacheKey, async () => {
      const attendanceRecord = await Attendance.findById(id);
      return { record: attendanceRecord };
    }, 10 * 60 * 1000); // Cache for 10 minutes
    
    if (!result.record) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    
    res.status(200).json(result.record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new attendance record
const createAttendance = async (req, res) => {
  try {
    const { studentName, subjectName, totalClasses, startDate, collegeName, userId } = req.body;
    
    const newAttendance = new Attendance({
      studentName,
      subjectName,
      totalClasses,
      startDate,
      collegeName,
      userId
    });
    
    const savedAttendance = await newAttendance.save();
    
    // Invalidate user's attendance cache
    if (userId) {
      invalidateCache(`attendance_${userId}`);
    }
    
    res.status(201).json(savedAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an attendance record (for updating present classes)
const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { presentClasses } = req.body;
    
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      { presentClasses },
      { new: true, runValidators: true }
    );
    
    if (!updatedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    
    // Invalidate specific record cache and user's attendance cache
    invalidateCache(`attendance_single_${id}`);
    if (updatedAttendance.userId) {
      invalidateCache(`attendance_${updatedAttendance.userId}`);
    }
    
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an attendance record
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedAttendance = await Attendance.findByIdAndDelete(id);
    
    if (!deletedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    
    // Invalidate specific record cache and user's attendance cache
    invalidateCache(`attendance_single_${id}`);
    if (deletedAttendance.userId) {
      invalidateCache(`attendance_${deletedAttendance.userId}`);
    }
    
    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance
};