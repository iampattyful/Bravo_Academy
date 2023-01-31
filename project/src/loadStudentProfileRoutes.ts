import express from "express";
import { Request, Response } from "express";
import { client } from "./client";
export const loadStudentProfileRoutes = express.Router();

loadStudentProfileRoutes.get(
  "/studentLogin/:id",
  async (req: Request, res: Response) => {
    console.log(req.params.id);
    const student = await client.query(
      "SELECT * FROM users WHERE users.user_id = $1",
      [req.params.id]
    );
    if (student.rowCount == 0) {
      res.status(400).json({});
    } else {
      console.log(student.rows);
      const bookmarked = await client.query(
        "SELECT * FROM users INNER JOIN subject ON users.subject_id = subject.id WHERE user_id IN (SELECT bookmark_table.teacher_id FROM bookmark_table WHERE bookmark_table.student_id = $1) ORDER BY user_id DESC ",
        [req.params.id]
      );
      const appointment = await client.query (
        "SELECT * FROM users INNER JOIN subject ON users.subject_id = subject.id WHERE user_id IN (SELECT appointment.teacher_id FROM appointment WHERE appointment.student_id = $1) ORDER BY user_id DESC ",
        [req.params.id]
      )
      console.log(bookmarked.rows);
      console.log(appointment.rows);

      if (bookmarked.rowCount > 0) {
        res.status(200).json({
          result: true,
          message: "success",
          students: student.rows,
          bookmarked: bookmarked.rows,
          appointment: appointment.rows,
        });
      } else {
        res.status(200).json({
          result: true,
          message: "success",
          students: student.rows,
          bookmarked: [],
        });
      }
    }
    // }
  }
);

