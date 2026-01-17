import express from 'express';
const router = express.Router();
import {
  getAllAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance
} from '../controllers/attendanceController.js';

// Routes for attendance tracking
router.get('/:userId', getAllAttendance);        // Get all attendance records for a user
router.get('/single/:id', getAttendanceById);   // Get a specific attendance record
router.post('/', createAttendance);             // Create a new attendance record
router.put('/:id', updateAttendance);           // Update an attendance record
router.delete('/:id', deleteAttendance);        // Delete an attendance record

export default router;