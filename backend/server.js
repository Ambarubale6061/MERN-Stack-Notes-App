const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-notes';
mongoose.connect(MONGO).then(()=> {
  console.log('Connected to MongoDB');
  app.listen(PORT, ()=> console.log('Server started on port', PORT));
}).catch(err => {
  console.error('MongoDB connection error', err);
});
