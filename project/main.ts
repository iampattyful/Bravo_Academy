import express from "express";

const app = express();
app.use(express.urlencoded());
app.use(express.json());

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

//load user comments
import { loadUserCommentRoutes } from "./src/loadUserCommentRoutes";
app.use("/", loadUserCommentRoutes);

app.use(express.static("public"));
app.use(express.static("uploads"));

//loadTeacher
import { loadTeacherRoutes } from "./src/loadTeacherRoutes";
app.use("/", loadTeacherRoutes);

//loadTeacherIndividualPageRoutes
import { loadTeacherIndividualPageRoutes } from "./src/loadTeacherIndividualPageRoutes";
app.use("/", loadTeacherIndividualPageRoutes);

//loadTeacherSettingsRoutes
import { loadTeacherSettingsRoutes } from "./src/loadTeacherSettingsRoutes";
app.use("/", loadTeacherSettingsRoutes);

//updateTeacherSettingsRoutes
import { updateTeacherSettingsRoutes } from "./src/updateTeacherSettingsRoutes";
app.use("/", updateTeacherSettingsRoutes);

//update student profile
import { updateStudentLoginRoutes } from "./src/updateStudentLoginRoutes";
app.use("/", updateStudentLoginRoutes);

//load student profile
import { loadStudentProfileRoutes } from "./src/loadStudentProfileRoutes";
app.use("/", loadStudentProfileRoutes);

//bookmark
import { bookmarkRoutes } from "./src/bookmarkRoutes";
app.use("/", bookmarkRoutes);

//remove bookmark
import { removeBookmarkRoutes } from "./src/removeBookmarkRoutes";
app.use("/", removeBookmarkRoutes);

//contact us
import { contactUsRoutes } from "./src/contactUsRoutes";
app.use("/", contactUsRoutes);

//admin login
const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.session.user?.role_id == "3") {
    next();
  } else {
    res.redirect("/");
  }
};

// //404
// import { errorRoutes } from "./src/404Routes";
// app.use("/", errorRoutes);

app.use(isLoggedIn, express.static("protected"));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
