import express, { Request, Response } from "express";
import "dotenv/config";

const PORT = process.env.PORT || 7000;
const app = express();

app.get("/test", (req: Request, res: Response) => {
  res.json({ hello: "World" });
});

app.listen(PORT, () => {
  console.log(`server is runnig on port:${PORT}`);
});
