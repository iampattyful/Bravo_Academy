import express from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";
import mainRouter from "./src/router";

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
import "./src/expressSessionRoutes";
app.use(applyExpressSessionMiddleware);
app.use(mainRouter);

app.use(express.static("public"));
app.use(express.static("uploads"));
app.use("/review", express.static("pages"));

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
import { errorRoutes } from "./src/404Routes";
import { applyExpressSessionMiddleware } from "./src/expressSessionRoutes";
// app.use("/", errorRoutes);
app.use("*", errorRoutes);
app.use(isLoggedIn, express.static("protected"));

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
