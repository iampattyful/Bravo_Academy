import express from "express";
import expressSession from "express-session";
import { Request, Response } from "express";
// import path from "path";
import formidable from "formidable";
import fs from "fs";
import { client } from "./src/client";
import { checkPassword } from "./src/hash";
import { hashPassword } from "./src/hash";

const app = express();

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 2 ** 10,
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});

app.use(
  expressSession({
    secret: "testingABC",
    resave: true,
    saveUninitialized: true,
  })
);

declare module "express-session" {
  interface SessionData {
    counter?: number;
    user?: {
      id?: string;
      username?: string;
      role_id?: string;
      subject_id?: string;
    };
  }
}

//login
app.post("/login", async (req: Request, res: Response) => {
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
      console.table(users.rows);
      res.status(200).json({
        result: true,
        message: "success",
        users,
      });
      return;
    } else {
      res.status(401).send("User not found");
      return;
    }
  });
});

// //sign up
app.post("/signup", async (req: Request, res: Response) => {
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

app.use(express.static("public"));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
