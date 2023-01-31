import express from "express";
import { Request, Response } from "express";
export const contactTeacherRoutes = express.Router();
import { client } from "./client";

import { expressSessionRoutes } from "./expressSessionRoutes";
contactTeacherRoutes.use("/", expressSessionRoutes);

contactTeacherRoutes.post("/contactTeacher/:id", async (req: Request, res: Response) => {
    let contactTeacherResult = await client.query(
      "SELECT * FROM appointment WHERE student_id = $1 AND teacher_id = $2",
      [req.session.user?.id, req.params.id]
    );
    if (!contactTeacherResult.rowCount) {
      await client.query(
        "INSERT into appointment (student_id, teacher_id) VALUES ($1,$2)",
        [req.session.user?.id, req.params.id]
      );
      let teacher = await client.query("SELECT * FROM users WHERE user_id = $1",
      [req.params.id])
      console.table(await teacher.rows);
      res.status(200).json({
        result: true,
        message: "success",
        teacher: teacher.rows[0],
      });
     
      let result = await client.query("SELECT * FROM appointment");
      console.table(await result.rows);
    } else {
        res.status(200).json({
            result: false,
            message: "success",
          });
    }
  });
  