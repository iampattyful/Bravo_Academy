import express from "express";
import { Request, Response } from "express";
export const updateTeacherSettings = express.Router();

//express session
import { expressSessionRoutes } from "./expressSessionRoutes";
updateTeacherSettings.use("/", expressSessionRoutes);

updateTeacherSettings.get(
  "/teacher_profile_settings/:id",
  async (req: Request, res: Response) => {
    if (req.session.user) {
      console.log(req.session.user);
      res.status(200).json({
        result: true,
        message: "success",
      });
    } else {
      res.status(401).json({
        result: false,
        message: "fail",
      });
    }
  }
);
