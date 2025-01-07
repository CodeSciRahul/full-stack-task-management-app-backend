import mongoose from "mongoose";

const connectDB = async(mongoUrl) => {
    const db_config_object = { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose
    .connect(mongoUrl, db_config_object)
    .then(() => {
        console.log("Connected to Database!");
    })
    .then((err) => {
        if(err) console.log(err);
    })
}

export default connectDB