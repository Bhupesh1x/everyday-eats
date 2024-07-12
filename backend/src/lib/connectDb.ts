import mongoose from "mongoose";
import "dotenv/config";

function connectDb() {
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
      console.log("connected to mongo yeah!");
    })
    .catch((err) => {
      console.log(`error connecting with mongo: ${err}`);
    });
}

export default connectDb;
