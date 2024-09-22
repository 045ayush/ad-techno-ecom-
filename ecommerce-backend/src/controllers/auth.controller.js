const userService = require('../services/user.service.js');
const jwtProvider = require('../config/jwtProvider.js');
const bcrypt = require('bcrypt');
const cartService = require('../services/cart.service.js');

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const token = jwtProvider.generateToken(user.id);

    // Create a cart for the user upon registration
    await cartService.createCart(user.id);

    return res.status(201).send({ token, message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: `User not found with email: ${email}` });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwtProvider.generateToken(user.id);

    return res.status(200).send({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { register, login };
