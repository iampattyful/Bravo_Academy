import express from "express";
import { Request, Response } from "express";
import formidable from "formidable";
import fs from "fs";
import { client } from "./client";
import { hashPassword } from "./hash";

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 2 ** 10,
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});
export const signupRoutes = express.Router();

signupRoutes.post("/signup", async (req: Request, res: Response) => {
  form.parse(req, async (err, fields, files) => {
    try {
      fields.price = fields.price || "0";

      fields.duration = fields.duration || "0";

      if (fields.roleId == "2") {
        fields.subjectId = "5";
      }

      console.log(fields);

      let newUser = await client.query(
        "INSERT INTO users (email, password, username, phone, description, price, duration, image, role_id, subject_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
        [
          fields.email,
          await hashPassword(fields.password as string),
          fields.username,
          fields.phone,
          fields.description,
          fields.price,
          fields.duration,
          files.image ? (files.image as formidable.File).newFilename : null,
          fields.roleId,
          fields.subjectId,
        ]
      );
      res
        .status(200)
        .json({ result: true, message: "success", newUser: newUser.rows });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        result: false,
        message: "success",
      });
    }
  });
});