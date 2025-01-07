import dotenv from "dotenv"

const properties = {
    PORT: Number(process.env.PORT) || 5000,
  
    SERVER_URL: process.env.SERVER_URL || `http://localhost:5000`,
  
    CLIENT_URL: process.env.CLIENT_URL || `http://localhost:5173`,
  
    MONGO_URL:
      process.env.MONGO_URL || `mongodb://localhost:27017/food-delivery`,
    
    SALT_ROUND: Number(process.env.SALT_ROUND) || 10,

    SECERT_KEY: process.env.SECRET_KEY || "rahulkumar@1234"
  
  };
  
  export default properties;