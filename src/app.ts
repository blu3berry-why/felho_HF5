import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import movieService from "./services/movie_service";
import mongoose from "mongoose";

const app: Application = express();
const PORT: number = 3000;

app.use(bodyParser.json());

app.use("/hello", movieService);

app.use("/", (req: Request, res: Response): void => {
  res.send("Hello world!");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/vsquvg")
  .then((res) => {
    console.log("Connected to MongoDB");
    app.listen(PORT, (): void => {
      console.log("Listening on:", PORT);
    });
  })
  .catch((err) => console.log(err));
