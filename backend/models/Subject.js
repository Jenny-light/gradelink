import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subjectCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  subjectName: {
    type: String,
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  credits: {
    type: Number,
    default: 1
  },
  description: String,
  syllabus: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

subjectSchema.index({ subjectCode: 1 });
subjectSchema.index({ class: 1 });
subjectSchema.index({ teacher: 1 });

// Virtual for grades in this subject
subjectSchema.virtual('grades', {
  ref: 'Grade',
  localField: '_id',
  foreignField: 'subject'
});

export default mongoose.model('Subject', subjectSchema);