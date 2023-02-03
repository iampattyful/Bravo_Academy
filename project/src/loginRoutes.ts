import express from "express";

import { Request, Response } from "express";

import formidable from "formidable";

import fs from "fs";

import { checkPassword } from "./hash";

import { client } from "./client";

// import path from "path";

export const loginRoutes = express.Router();

//express session
import "./src/expressSessionRoutes";

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
    if (err) {
      res.json({
        err,
        success: false,
      });
      return;
    }
    let users = await client.query("SELECT * from users where email = $1", [
      fields.email,
    ]);
    if (users.rowCount == 0) {
      res.json({
        err: "User not found/Wrong Password!",
        success: false,
      });
      return;
    }
    const password = users.rows[0].password;
    const match = await checkPassword(fields.password as string, password);
    if (!match) {
      res.json({
        err: "User not found/Wrong Password!",
        success: false,
      });
      return;
    }
    req.session.user = {
      id: users.rows[0].user_id,
      username: users.rows[0].username,
      role_id: users.rows[0].role_id,
      subject_id: users.rows[0].subject_id,
    };
    res.status(200).json({
      result: true,
      message: "success",
      users: req.session.user,
    });
  });
});
