import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import connectDB from "./src/config/dbConfig.js";
import properties from "./src/config/properties.js";
import {protectRoute} from "./src/api/middlewares/protectedRoute.js"

//different route
import { authRoute } from "./src/api/router/auth.js";
import {menuRoute} from "./src/api/router/menu.js"
import {orderRoute} from "./src/api/router/order.js"

dotenv.config();

//connect DB
connectDB(properties.MONGO_URL).catch(err => {
    console.error('Failed to connect to MongoDB', err)});

const app = express();

// Updated CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://full-stack-task-management-app-theta.vercel.app",
      "https://app.quickbite.com",
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};


app.use(cors(corsOptions));

// Preflight requests handler
app.options("*", cors(corsOptions)); // Handles preflight for all routes
app.use(bodyParser.json());

const port = Number(properties.PORT) || 5000;

app.get("/", async (req, res) => {
    return res.send(`<h1>Running backend on Port : ${port}</h1>`);
  });

 //route
 app.use("/api", authRoute)
 app.use("/api", protectRoute, menuRoute)
 app.use("/api", protectRoute, orderRoute)

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Open Browser: http://localhost:${port}`);
  });