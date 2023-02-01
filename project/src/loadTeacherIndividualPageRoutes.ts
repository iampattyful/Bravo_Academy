// This file contains the ts code for the teacher profile page

import express from "express";
import { Request, Response } from "express";
import { client } from "./client";
export const loadTeacherIndividualPageRoutes = express.Router();

// This route is used to load the teacher profile page
loadTeacherIndividualPageRoutes.post(
  "/teacher_profile/:id",
  async (req: Request, res: Response) => {
    console.log(req.params.id);
    const teachers = await client.query(
      "SELECT image, subject_id, subject.subject_name, users.user_id, username, description, price, duration FROM users INNER JOIN subject ON users.subject_id = subject.id WHERE (users.user_id = $1) and (role_id not in (2) ) ORDER BY user_id desc",
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
      console.log(teachers.rows);
      res.status(200).json({
        result: true,
        message: "success",
        teachers: teachers.rows,
      });
    }
  }
);
