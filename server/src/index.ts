import { configDotenv } from "dotenv";
import express from "express";
import helmet from "helmet";

configDotenv();

const app = express();

let port = 8080;
if (process.env.PORT != undefined) {
  port = Number(process.env.PORT);
}

let host = "localhost";
if (process.env.HOST != undefined) {
  host = process.env.HOST;
}

app.use(helmet());

app.listen(port, host, () => {
  console.log("Successfully launched rest server on port: ", port);
});
