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
      res.status(200).json({
        result: true,
        message: "success",
        students: student.rows,
      });
    }
  }
);
