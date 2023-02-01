import express from "express";
import { Request, Response } from "express";
import { client } from "./client";
export const loadUserCommentRoutes = express.Router();

loadUserCommentRoutes.get(
  "/user_comment",
  async (req: Request, res: Response) => {
    const comments = await client.query(
      "SELECT username, users.user_id, image, content, subject_name, role_name FROM users INNER JOIN user_comment_table ON user_comment_table.user_id  = users.user_id INNER JOIN subject ON users.subject_id = subject.id INNER JOIN role ON users.role_id = role.id  ORDER BY user_comment_table.comment_id desc"
    );
    if (comments.rowCount == 0) {
      res.status(400).json({});
    } else {
      console.log(comments.rows[0].subject_name);
      res.status(200).json({
        result: true,
        message: "success",
        comments: comments.rows,
      });
    }
  }
);
