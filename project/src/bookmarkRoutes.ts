import express from "express";
import { Request, Response } from "express";
export const bookmarkRoutes = express.Router();
import { client } from "./client";

//express session
import { expressSessionRoutes } from "./expressSessionRoutes";
bookmarkRoutes.use("/", expressSessionRoutes);

bookmarkRoutes.post("/bookmark/:id", async (req: Request, res: Response) => {
  await client.query(
    "INSERT into bookmark_table (student_id, teacher_id) VALUES ($1,$2)",
    [req.session.user?.id, req.params.id]
  );

  let result = await client.query("SELECT * FROM bookmark_table");
  console.table(result.rows);

  res.status(200).json({
    result: true,
    message: "success",
    users: req.session.user,
  });
});
