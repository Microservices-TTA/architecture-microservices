import express, { Request, Response } from "express";

const app = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/orders", (req: Request, res: Response) => {
  res.send("Orders list");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
