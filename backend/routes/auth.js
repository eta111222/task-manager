const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');  
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 8);  
    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], function (err) {
      if (err) {
        return res.status(500).json({ message: 'User already exists or database error' });
      }
      res.status(201).json({ message: 'User registered successfully!' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).send('Error on the server');
    }
    if (!user) {
      return res.status(404).send('No user found');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 3600 }); 

    res.status(200).send({ token });
  });
});

module.exports = router;
