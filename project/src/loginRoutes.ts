import express from "express";

import { Request, Response } from "express";

import formidable from "formidable";

import fs from "fs";

import { checkPassword } from "./hash";

import { client } from "./client";

export const loginRoutes = express.Router();

//express session
import { expressSessionRoutes } from "./expressSessionRoutes";
loginRoutes.use("/", expressSessionRoutes);

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 2 ** 10,
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});

//login
loginRoutes.post("/login", async (req: Request, res: Response) => {
  form.parse(req, async (err, fields, files) => {
    let found = false;
    let users = await client.query("SELECT * from users where email = $1", [
      fields.email,
    ]);
    if (!users.rowCount) {
      return res.status(401).redirect("/");
    }
    const password = users.rows[0].password;
    const match = await checkPassword(fields.password as string, password);
    if (users.rowCount >= 1) {
      if (match) {
        if (req.session) {
          req.session.user = {
            id: users.rows[0].user_id,
            username: users.rows[0].username,
          };
          console.log(req.session.user);
          found = true;
        }
      }
    }

    if (found) {
      let users = await client.query("SELECT * from users");
      res.status(200).json({
        result: true,
        message: "success",
        users,
      });
      return;
    } else {
      res.status(401).json({ result: false, message: "fail", users });
      return;
    }
  });
});
