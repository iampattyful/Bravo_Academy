import express from "express";
import { Request, Response } from "express";
import { client } from "./client";
export const loadTeacherIndividualPageRoutes = express.Router();

loadTeacherIndividualPageRoutes.post(
  "/teacher_profile/:id",
  async (req: Request, res: Response) => {
    console.log(req.params.id);
    const teachers = await client.query(
      "SELECT * FROM users INNER JOIN subject ON users.subject_id = subject.id WHERE users.user_id = $1 ORDER BY user_id DESC ",
      [req.params.id]
    );
    if (teachers.rowCount == 0) {
      res.status(400).json({});
    } else {
      console.log(teachers.rows);
      res.status(200).json({
        result: true,
        message: "success",
        teachers: teachers.rows,
      });
    }
  }
);
