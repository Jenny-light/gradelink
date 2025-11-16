import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  gradeLevel: {
    type: String,
    required: true,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  },
  section: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  roomNumber: String,
  academicYear: {
    type: String,
    required: true,
    default: () => {
      const currentYear = new Date().getFullYear();
      return `${currentYear}-${currentYear + 1}`;
    }
  },
  capacity: {
    type: Number,
    default: 40
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

classSchema.index({ className: 1 });
classSchema.index({ teacher: 1 });
classSchema.index({ academicYear: 1 });

// Virtual for students in this class
classSchema.virtual('students', {
  ref: 'Student',
  localField: '_id',
  foreignField: 'class'
});

// Virtual for subjects in this class
classSchema.virtual('subjects', {
  ref: 'Subject',
  localField: '_id',
  foreignField: 'class'
});

export default mongoose.model('Class', classSchema);