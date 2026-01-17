import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  subjectName: {
    type: String,
    required: true
  },
  totalClasses: {
    type: Number,
    required: true
  },
  presentClasses: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    required: true
  },
  collegeName: {
    type: String,
    required: true
  },
  userId: {
    type: String, // Assuming you'll tie this to a user
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Attendance', attendanceSchema);