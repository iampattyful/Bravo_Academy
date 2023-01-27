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
export const updateTeacherSettingsRoutes = express.Router();

//express session
import { expressSessionRoutes } from "./expressSessionRoutes";
updateTeacherSettingsRoutes.use(expressSessionRoutes);

updateTeacherSettingsRoutes.put(
  "/updateTeacherSettings/:id",
  async (req: Request, res: Response) => {
    form.parse(req, async (err, fields, files) => {
      console.log(files, fields, err);
      try {
        fields.price = fields.price || "0";

        fields.duration = fields.duration || "0";

        if (fields.roleId == "2") {
          fields.subjectId = "5";
        }

       let updateRes = await client.query(
          "UPDATE users SET username = $1, phone = $2, description = $3, price = $4, duration = $5, image = $6 WHERE user_id = $7",
          [
            fields.username,
            fields.phone,
            fields.description,
            fields.price,
            fields.duration,
            files.image ? (files.image as formidable.File).newFilename : null,
            req.params.id
          ]
        );
        console.log(updateRes);
        
        res.status(200).json({
          result: true,
          message: "success",
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
