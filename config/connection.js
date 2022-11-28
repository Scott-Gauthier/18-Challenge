const mongoose = require('mongoose');
require('dotenv').config();

const connectionString =
  process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/social-network-DB`; //social-network-DB

// Wrap Mongoose around local connection to MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;
