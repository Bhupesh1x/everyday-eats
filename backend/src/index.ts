import express, { Request, Response } from "express";
import "dotenv/config";

import connectDb from "./lib/connectDb";

const PORT = process.env.PORT || 7000;
const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req: Request, res: Response) => {
  res.json({ hello: "World" });
});

app.listen(PORT, () => {
  console.log(`server is runnig on port:${PORT}`);
});
