const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    console.log('User Registered:', { id: user.id, username: user.username });
    res.status(201).json({ id: user.id, username: user.username });
  } catch (error) {
    console.log('Registration Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await user.validPassword(password))) {
      console.log('Invalid credentials');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    console.log('Generated Token:', token);
    res.status(200).json({ token });
  } catch (error) {
    console.log('Login Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
