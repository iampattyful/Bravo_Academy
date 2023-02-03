import express from "express";
import { Request, Response } from "express";
import { client } from "./client";
export const updateContactUsRoutes = express.Router();

updateContactUsRoutes.put(
  "/contactus/:id",
  async (req: Request, res: Response) => {
    const content = await client.query(
      "SELECT * FROM contact_us WHERE id = $1",
      [req.params.id]
    );
    if (content.rowCount > 0) {
      await client.query("UPDATE contact_us SET read = $1 WHERE id = $2", [
        1,
        req.params.id,
      ]);

      res.status(200).json({
        result: true,
        message: "success",
      });
    } else {
      res.status(200).json({
        result: false,
        message: "success",
      });
    }
  }
);
