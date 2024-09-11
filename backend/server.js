const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');  
const taskRoutes = require('./routes/tasks'); 
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use('/tasks', taskRoutes);

app.listen(5005, () => {
  console.log('Server is running on port 5005');
});





