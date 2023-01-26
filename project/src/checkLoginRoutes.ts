import express from "express";
import { Request, Response } from "express";
export const checkLoginRoutes = express.Router();

//express session
import { expressSessionRoutes } from "./expressSessionRoutes";
checkLoginRoutes.use("/", expressSessionRoutes);

checkLoginRoutes.get("/checkLogin", async (req: Request, res: Response) => {
  if (req.session.user) {
    // console.log(req.session.user);
    res.status(200).json({
      result: true,
      message: "success",
      users: req.session.user,
    });
    // console.log(req.session.user);
  } else {
    res.status(200).json({
      result: false,
      message: "fail",
    });
  }
});
