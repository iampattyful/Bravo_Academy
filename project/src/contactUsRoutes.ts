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
export const contactUsRoutes = express.Router();

contactUsRoutes.post("/contactus", async (req: Request, res: Response) => {
  form.parse(req, async (err, fields, files) => {
    if (fields.email && fields.message) {
      await client.query(
        "INSERT INTO contact_us (email, content) VALUES ($1, $2)",
        [fields.email, fields.message]
      );
      let result = await client.query("SELECT * FROM contact_us");
      console.table(result.rows);
      res.status(200).json({
        result: true,
        message: "success",
      });
    } else {
      res.status(200).json({
        result: false,
        message: "empty field",
      });
    }
  });
});
