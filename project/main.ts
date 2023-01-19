import express from "express";
import expressSession from "express-session";
import { Request, Response } from "express";
// import path from "path";
import formidable from "formidable";
import fs from "fs";
import { client } from "./src/client";
import { checkPassword } from "./src/login";

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
    };
  }
}

app.post("/login", async (req: Request, res: Response) => {
  form.parse(req, async (err, fields, files) => {
    let found = false;
    let users = await client.query("SELECT * from users where username = $1", [
      fields.username,
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

app.use(express.static("public"));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
