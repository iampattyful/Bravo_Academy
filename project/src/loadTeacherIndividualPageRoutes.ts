import express from "express";
import { Request, Response } from "express";
import { client } from "./client";
export const loadTeacherIndividualPageRoutes = express.Router();

loadTeacherIndividualPageRoutes.post(
  "/teacher_profile/:id",
  async (req: Request, res: Response) => {
    console.log(req.params.id);
    const teacher = await client.query(
      "SELECT * FROM users INNER JOIN subject ON users.subject_id = subject.id WHERE users.user_id = $1 ORDER BY user_id DESC ",
      [req.params.id]
    );
    if (teacher.rowCount == 0) {
      res.status(400).json({});
    } else {
      console.log(teacher.rows);
      res.status(200).json({
        result: true,
        message: "success",
        teacher: teacher.rows,
      });
    }
  }
);
