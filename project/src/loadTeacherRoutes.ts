import express from "express";
import { Request, Response } from "express";
import { client } from "./client";
export const loadTeacherRoutes = express.Router();

loadTeacherRoutes.post(
  "/teachers/:id/",
  async (req: Request, res: Response) => {
    // console.log(req.params.id);

    // select * FROM bookmark_table where student_id = req.session.userId and teacher_id = req.params.teacher_id
    const teachers = await client.query(
      // "SELECT student_id FROM users WHERE subject_id = $1",

      "SELECT * FROM users INNER JOIN subject ON users.subject_id = subject.id WHERE users.subject_id = $1 ORDER BY user_id DESC ",
      [req.params.id]
    );
    let results = teachers.rows;
    let my_book_mark = await client.query(
      `SELECT teacher_id FROM bookmark_table where student_id = $1`,
      [req.session.user?.id]
    );

    if (my_book_mark.rowCount > 0) {
      let bookmarkIdArr = my_book_mark.rows.map((obj) => obj.teacher_id);
      // console.log(bookmarkIdArr, "27");
      results = results.map((obj) =>
        bookmarkIdArr.includes(obj.user_id)
          ? Object.assign(obj, { isBookMark: true })
          : Object.assign(obj, { isBookMark: false })
      );
    }
    if (teachers.rowCount == 0) {
      res.status(400).json({});
    } else {
      console.log(results);
      res.status(200).json({
        result: true,
        message: "success",
        teachers: results,
      });
    }
  }
);
