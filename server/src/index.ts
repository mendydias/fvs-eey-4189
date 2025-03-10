import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import getUserRegistrationRouter from "./routes/registration-controller";
import loadConfig from "./config";

const app = express();

// default security middleware
app.use(helmet());
// json parser ensures the content-type is set correctly and also that the post bodies are correctly parsed.
app.use(bodyParser.json());

// routers
const config = loadConfig();
const RegistrationRouter = getUserRegistrationRouter(config);
app.use("/register", RegistrationRouter);

// default sanity handshake
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default function getApplication() {
  return {
    config,
    app,
  };
}
