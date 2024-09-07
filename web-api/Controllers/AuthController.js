const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const AuthController = {
  register: async (req, res) => {
    const { username, password, role } = req.body;

    try {
      let user = await UserModel.findOne({ username });
      if (user) return res.status(400).json({ message: "User already exists" });

      user = new UserModel({ username, password, role });
      await user.save();

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await UserModel.findOne({ username });
      if (!user)
        return res.status(400).json({ message: "username is incorrect" });

      const isMatch = await user.comparePassword(password);
      if (!isMatch)
        return res.status(400).json({ message: "password is incorrect " });

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
      console.log(user + "useri logedin");
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = AuthController;
