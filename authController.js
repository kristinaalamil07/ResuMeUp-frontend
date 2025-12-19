import User from "../models/User.js"; // your Mongoose User model

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  // Save user in MongoDB here
  res.status(201).json({ message: "User registered successfully" });

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
