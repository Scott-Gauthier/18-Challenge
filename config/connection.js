const mongoose = require('mongoose');
require('dotenv').config();

// Wrap Mongoose around local connection to MongoDB
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;
