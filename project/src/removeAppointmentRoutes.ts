import express from "express";
import { Request, Response } from "express";
export const removeAppointmentRoutes = express.Router();
import { client } from "./client";

//express session
import "./expressSessionRoutes";

removeAppointmentRoutes.delete(
  "/uncontactTeacher/:id",
  async (req: Request, res: Response) => {
    let appointmentResult = await client.query(
      "SELECT * FROM appointment WHERE student_id = $1 AND teacher_id = $2",
      [req.session.user?.id, req.params.id]
    );
    if (appointmentResult.rowCount > 0) {
      await client.query(
        "DELETE FROM appointment WHERE student_id = $1 AND teacher_id = $2",
        [req.session.user?.id, req.params.id]
      );
      res.status(200).json({
        result: true,
        message: "success",
      });
      let result = await client.query("SELECT * FROM appointment");
      console.table(await result.rows);
    } else {
      res.status(400);
    }
  }
);
