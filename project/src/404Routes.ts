import express from "express";
import { Request, Response } from "express";
import path from "path";
// import { client } from "./client";
export const errorRoutes = express.Router();

errorRoutes.use((req: Request, res: Response) => {
  res.status(404);
  res.sendFile(path.resolve("public/404.html"));
});
