const userService = require("../services/user.service");

const getUserProfile = async (req, res) => {
  try {
    // Extract JWT token from the Authorization header
    const jwt = req.headers.authorization?.split(' ')[1];
    
    if (!jwt) {
      return res.status(404).send({ error: "Token not found" });
    }

    // Fetch user profile using the JWT token
    const user = await userService.getUserProfileByToken(jwt);

    return res.status(200).send(user);
  } catch (error) {
    console.log("Error from controller -", error);
    return res.status(501).send({ error: error.message });
  }
};
const getUserById = async (req, res) => {
  try {
    // Extract JWT token from the Authorization header
    const { userId } = req.params;

    // Fetch user profile using the JWT token
    const user = await userService.getUserById(Number(userId));
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
  }
    return res.status(200).send(user);
  } catch (error) {
    console.log("Error from controller -", error);
    return res.status(501).send({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Fetch all users
    
    const users = await userService.getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { getUserProfile, getAllUsers,getUserById };