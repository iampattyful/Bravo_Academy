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

//updateTeacherSettings
// import { updateTeacherSettings } from "./src/updateTeacherSettings";
// app.use("/", updateTeacherSettings);

//404

app.use(express.static("public"));
app.use(express.static("uploads"));

import { errorRoutes } from "./src/404Routes";
app.use("/", errorRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
