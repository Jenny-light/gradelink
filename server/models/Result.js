const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  session: String,
  term: String,
  ca: Number,
  exam: Number,
  total: Number,
  grade: String
});

module.exports = mongoose.model('Result', ResultSchema);
