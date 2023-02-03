import express from "express";
import { Request, Response } from "express";
import formidable from "formidable";
import fs from "fs";
import { client } from "./client";
export const updateTeacherSettingsRoutes = express.Router();

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 10 * 1024 * 1024,
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});
export const updateStudentLoginRoutes = express.Router();

//express session
import { expressSessionRoutes } from "./expressSessionRoutes";
updateStudentLoginRoutes.use(expressSessionRoutes);

updateStudentLoginRoutes.put(
  "/updateStudentLogin/:id",
  async (req: Request, res: Response) => {
    form.parse(req, async (err, fields, files) => {
      console.log(files, fields, err);
      try {
        let result = await client.query(
          "SELECT image from users WHERE user_id = $1",
          [req.params.id]
        );
        await client.query(
          "UPDATE users SET username = $1, phone = $2, description = $3, image = $4 WHERE user_id = $5",
          [
            fields.username,
            fields.phone,
            fields.description,
            files.image
              ? (files.image as formidable.File).newFilename
              : result.rows[0].image,
            req.params.id,
          ]
        );

        if (req.session.user) {
          req.session.user.username = fields.username as string;
        }
        res.status(200).json({
          result: true,
          message: "success",
          // student: result.rows[0],
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          result: false,
          message: "fail",
        });
      }
    });
  }
);

// submit user comment
updateTeacherSettingsRoutes.post(
  "/submitUserComment/:id",
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
