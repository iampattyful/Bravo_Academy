import express from "express";
// import expressSession from "express-session";
// import { Request, Response } from "express";
// import path from "path";
// import formidable from "formidable";
// import fs from "fs";

const app = express();
app.use(express.static("public"));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
