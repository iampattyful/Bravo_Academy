import express from "express";
import { Request, Response } from "express";
import formidable from "formidable";
import fs from "fs";
import { client } from "./client";

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

        // let result = await client.query(
        //   "SELECT username FROM users WHERE user_id = $1",
        //   [req.params.id]
        // );

        // console.log(result.rows);

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
