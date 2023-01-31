import express from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";

const app = express();
app.use(express.urlencoded());
app.use(express.json());
const server = new http.Server(app);
export const io = new SocketIO(server);

io.on("connection", function (socket) {
  console.log({ socketEvent: "connection", "socket.id": socket.id });

  socket.on("newMessage", () => {
    console.log(1);
    io.emit("new-contactus");
  });
});

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

// load user comment
import { loadUserCommentRoutes } from "./src/loadUserCommentRoutes";
app.use("/", loadUserCommentRoutes);

// contact teacher 
import { contactTeacherRoutes } from "./src/contactTeacherRoute";
app.use("/",contactTeacherRoutes)

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

//load contact us data
import { loadContactUsRoutes } from "./src/loadContactUsRoutes";
app.use("/", loadContactUsRoutes);

//update contact us data
import { updateContactUsRoutes } from "./src/updateContactUsRoutes";
app.use("/", updateContactUsRoutes);

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
