import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  marks: {
    type: Number,
    required: true,
    min: [0, 'Marks cannot be less than 0'],
    max: [100, 'Marks cannot exceed 100']
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'],
    required: true
  },
  gpa: {
    type: Number,
    min: 0,
    max: 4.0
  },
  term: {
    type: String,
    required: true,
    enum: ['First Term', 'Second Term', 'Third Term', 'Final']
  },
  academicYear: {
    type: String,
    required: true
  },
  examType: {
    type: String,
    enum: ['Quiz', 'Assignment', 'Midterm', 'Final', 'Project'],
    default: 'Final'
  },
  maxMarks: {
    type: Number,
    default: 100
  },
  comments: String,
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: Date
}, {
  timestamps: true
});

// Compound index to ensure unique grades per student per subject per term
gradeSchema.index({ student: 1, subject: 1, term: 1, academicYear: 1 }, { unique: true });

// Pre-save middleware to calculate grade and GPA
gradeSchema.pre('save', function(next) {
  // Calculate grade based on marks
  const marks = this.marks;
  if (marks >= 90) {
    this.grade = 'A+';
    this.gpa = 4.0;
  } else if (marks >= 85) {
    this.grade = 'A';
    this.gpa = 3.7;
  } else if (marks >= 80) {
    this.grade = 'A-';
    this.gpa = 3.3;
  } else if (marks >= 75) {
    this.grade = 'B+';
    this.gpa = 3.0;
  } else if (marks >= 70) {
    this.grade = 'B';
    this.gpa = 2.7;
  } else if (marks >= 65) {
    this.grade = 'B-';
    this.gpa = 2.3;
  } else if (marks >= 60) {
    this.grade = 'C+';
    this.gpa = 2.0;
  } else if (marks >= 55) {
    this.grade = 'C';
    this.gpa = 1.7;
  } else if (marks >= 50) {
    this.grade = 'C-';
    this.gpa = 1.3;
  } else if (marks >= 45) {
    this.grade = 'D';
    this.gpa = 1.0;
  } else {
    this.grade = 'F';
    this.gpa = 0.0;
  }

  // Set publishedAt if isPublished is being set to true
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

// Instance method to get grade details
gradeSchema.methods.getGradeDetails = function() {
  return {
    marks: this.marks,
    grade: this.grade,
    gpa: this.gpa,
    percentage: (this.marks / this.maxMarks) * 100,
    status: this.grade === 'F' ? 'Fail' : 'Pass'
  };
};

export default mongoose.model('Grade', gradeSchema);