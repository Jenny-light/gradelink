const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student', 'parent'], default: 'student' },
  linkedStudentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
});

module.exports = mongoose.model('User', UserSchema);
