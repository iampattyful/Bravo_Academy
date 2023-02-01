import express from "express";
import { Request, Response } from "express";
import { client } from "./client";
import moment from "moment";
export const loadContactUsRoutes = express.Router();

loadContactUsRoutes.get("/contactus", async (req: Request, res: Response) => {
  const content = await client.query(
    "SELECT * FROM contact_us ORDER BY created_at DESC"
  );
  console.table(content.rows);

  if (content.rowCount) {
    content.rows.map((obj) => {
      let format = moment(obj.created_at).format("MMMM Do YYYY, h:mm:ss a");
      let result = moment(format, "MMMM Do YYYY, h:mm:ss a").fromNow();
      return Object.assign(obj, { created_at: result });
    });

    res.status(200).json({
      result: true,
      message: "success",
      contents: content.rows,
    });
  } else {
    res.status(200).json({
      result: false,
      message: "success",
      contents: [],
    });
  }
});
