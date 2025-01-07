import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import connectDB from "./src/config/dbConfig.js";
import properties from "./src/config/properties.js";

dotenv.config();

//connect DB
connectDB(properties.MONGO_URL).catch(err => {
    console.error('Failed to connect to MongoDB', err)});

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = Number(properties.PORT) || 5000;

app.get("*", async (req, res) => {
    return res.send(`<h1>Running backend on Port : ${port}</h1>`);
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Open Browser: http://localhost:${port}`);
  });