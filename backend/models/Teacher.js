import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  teacherId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  department: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  specialization: [String],
  joiningDate: {
    type: Date,
    default: Date.now
  },
  experience: {
    type: Number,
    default: 0
  },
  contactNumber: String,
  officeHours: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

teacherSchema.index({ teacherId: 1 });
teacherSchema.index({ department: 1 });

// Virtual for teacher's classes and subjects
teacherSchema.virtual('classes', {
  ref: 'Class',
  localField: '_id',
  foreignField: 'teacher'
});

teacherSchema.virtual('subjects', {
  ref: 'Subject',
  localField: '_id',
  foreignField: 'teacher'
});

teacherSchema.virtual('grades', {
  ref: 'Grade',
  localField: '_id',
  foreignField: 'teacher'
});

export default mongoose.model('Teacher', teacherSchema);