import express from "express";
import { Request, Response } from "express";
import { client } from "./client";
export const loadUserCommentRoutes = express.Router();

loadUserCommentRoutes.get(
  "/user_comment",
  async (req: Request, res: Response) => {
    const comments = await client.query(
      "SELECT image, username, content FROM user_comment_table INNER JOIN users ON user_comment_table.user_id  = users.user_id"
    );
    if (comments.rowCount == 0) {
      res.status(400).json({});
    } else {
      console.log(comments.rows);
      res.status(200).json({
        result: true,
        message: "success",
        comments: comments.rows,
      });
    }
  }
);
