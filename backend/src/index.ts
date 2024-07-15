import express from "express";
import "dotenv/config";

import connectDb from "./lib/connectDb";

import userRoutes from "./routes/user.routes";

const PORT = process.env.PORT || 7000;
const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`server is runnig on port:${PORT}`);
});
