import express from "express";
import expressSession from "express-session";
const app = express();

app.use(
  expressSession({
    secret: "testingABC",
    resave: true,
    saveUninitialized: true,
  })
);

declare module "express-session" {
  interface SessionData {
    counter?: number;
    user?: {
      id?: string;
      username?: string;
      role_id?: string;
      subject_id?: string;
    };
  }
}

//login
import { loginRoutes } from "./src/loginRoutes";
app.use("/", loginRoutes);

//sign up
import { signupRoutes } from "./src/signupRoutes";
app.use("/", signupRoutes);

app.use(express.static("public"));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
