import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import properties from "../../config/properties.js";

dotenv.config();
const SALT_ROUND = properties?.SALT_ROUND;
const SECRET_KEY = process.env.SECRET_KEY;


  //register User
export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if all fields are provided
        if (!(username && password)) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // Check if the username is already taken
        const existUser = await User.findOne({ username });
        if (existUser) {
            return res.status(400).send({ message: "Username already taken" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

        // Save the user in the database
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        const updatedUser = savedUser.toObject();
        delete updatedUser.password; // Remove the password before returning the user object

        // Create payload for JWT
        const payload = { userId: savedUser._id, username};

        // Generate token
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "48h" });

        // Send response
        return res.status(200).send({
            message: "User registered successfully",
            user: updatedUser,
            token,
        });

    } catch (error) {
        // Send appropriate error messages
        return res.status(500).send({ message: error?.message || "Internal Server Error" });
    }
};

//login user
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if all fields are provided
        if (!(username && password)) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ message: "Invalid username or password" });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid password" });
        }

        // Create payload for JWT
        const payload = { userId: user._id, username };

        // Generate token
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "48h" });

        // Remove password from the user object before sending
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        // Send response
        return res.status(200).send({
            message: "Login successful",
            user: userWithoutPassword,
            token,
        });

    } catch (error) {
        // Send appropriate error messages
        return res.status(500).send({ message: error?.message || "Internal Server Error" });
    }
};


