require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const exists = await User.findOne({ email: 'admin@gradelink.com' });
  if (!exists) {
    const hash = await bcrypt.hash('password123', 10);
    await User.create({ name: 'Admin', email: 'admin@gradelink.com', password: hash, role: 'admin' });
    console.log('✅ Admin user created');
  } else {
    console.log('Admin already exists');
  }
  process.exit();
})();
