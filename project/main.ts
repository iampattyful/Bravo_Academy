import express from "express";

const app = express();

//express session
import { expressSessionRoutes } from "./src/expressSessionRoutes";
app.use("/", expressSessionRoutes);

//login
import { loginRoutes } from "./src/loginRoutes";
app.use("/", loginRoutes);

//sign up
import { signupRoutes } from "./src/signupRoutes";
app.use("/", signupRoutes);

//logout
import { logoutRoutes } from "./src/logoutRoutes";
app.use("/", logoutRoutes);

//check login
import { checkLoginRoutes } from "./src/checkLoginRoutes";
app.use("/", checkLoginRoutes);

//loadTeacher
import { loadTeacherRoutes } from "./src/loadTeacherRoutes";
app.use("/", loadTeacherRoutes);

app.use(express.static("public"));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
