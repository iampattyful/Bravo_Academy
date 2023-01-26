import express from "express";
import { Request, Response } from "express";
export const logoutRoutes = express.Router();

//express session
import { expressSessionRoutes } from "./expressSessionRoutes";
logoutRoutes.use("/", expressSessionRoutes);

//logout
logoutRoutes.post("/logout", async (req: Request, res: Response) => {
  if (req.session.user) {
    delete req.session.user;
    console.log(req.session.user);
  }
  res.status(200).json({
    result: true,
    message: "success",
  });
});
