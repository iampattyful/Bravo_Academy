import express from "express";
import { Request, Response } from "express";
import expressSession from "express-session";
export const logoutRoutes = express.Router();

logoutRoutes.use(
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

//logout
logoutRoutes.post("/logout", async (req: Request, res: Response) => {
  if (req.session) {
    delete req.session.user;
    console.log(req.session.user);
    console.log(1);
  }
  res.status(200).json({
    result: true,
    message: "success",
  });
});
