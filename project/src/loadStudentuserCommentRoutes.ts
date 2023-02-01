import express from "express";
import { Request, Response } from "express";
import { client } from "./client";
export const loadUserCommentRoutes = express.Router();


// submit user comment
submitStudentUserCommentRoutes.post(
    "/submitStudentUserComment/:id",
    async (req: Request, res: Response) => {
      //req.body.userId
      // console.log(files, fields, err);
      try {
        // let result = await client.query(
        //   "SELECT image from users WHERE user_id = $1",
        //   [req.params.id]
        // );
  
        if (req.body.content) {
        await client.query(
          "INSERT INTO user_comment_table (user_id, content) VALUES ($1,$2)",
          [req.body.userId, req.body.content]
        );
        res.status(200).json({
          result: true,
          message: "success",
        });
      } else {
        res.status(200).json({
          result: false,
          message: "fail",
        });
      }
      } catch (err) {
        console.log(err);
        res.status(500).json({
          result: false,
          message: "fail",
        });
      }
    }
  );
  