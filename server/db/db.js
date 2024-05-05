const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURI = 'mongodb+srv://harnoor:ENJ9ZhKR0xWuZVe6@cluster0.8ibcaes.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;
