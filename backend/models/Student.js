import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  parentName: {
    type: String,
    required: true
  },
  parentContact: {
    type: String,
    required: true
  },
  emergencyContact: String,
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
studentSchema.index({ studentId: 1 });
studentSchema.index({ class: 1 });
studentSchema.index({ user: 1 });

// Virtual for student's full profile
studentSchema.virtual('grades', {
  ref: 'Grade',
  localField: '_id',
  foreignField: 'student'
});

studentSchema.virtual('fullProfile').get(function() {
  return {
    studentId: this.studentId,
    rollNumber: this.rollNumber,
    class: this.class,
    personalInfo: {
      dateOfBirth: this.dateOfBirth,
      address: this.address
    },
    parentInfo: {
      parentName: this.parentName,
      parentContact: this.parentContact,
      emergencyContact: this.emergencyContact
    }
  };
});

export default mongoose.model('Student', studentSchema);