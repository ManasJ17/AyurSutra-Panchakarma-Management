// Auth controller for registration, login, and protected route
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Hospital = require('../models/Hospital');

// Helper: get model by role
const getModelByRole = (role) => {
  if (role === 'patient') return Patient;
  if (role === 'practitioner') return Hospital;
  throw new Error('Invalid role');
};

exports.register = async (req, res) => {
  try {
    const { role, name, email, phone, password, address, city, state, pincode, servicesOffered } = req.body;
    if (!role || !name || !email || !phone || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const Model = getModelByRole(role);
    // Check for existing email/phone
    const existingEmail = await Model.findOne({ email });
    const existingPhone = await Model.findOne({ phone });
    if (existingEmail || existingPhone) {
      return res.status(409).json({ message: 'Email or phone already registered' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    let user;
    if (role === 'patient') {
      user = new Patient({ name, email, phone, passwordHash });
    } else {
      user = new Hospital({ name, email, phone, passwordHash, address, city, state, pincode, servicesOffered });
    }
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const Model = getModelByRole(role);
    const user = await Model.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.protected = (req, res) => {
  res.json({ message: 'Protected route accessed', user: req.user });
};
