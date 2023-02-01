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
