import pool from "../database";
import { QueryResult } from "pg";
import { Response, Request } from "express";

export const getRoles = async (req: Request, res: Response) => {
  try {
    const response: QueryResult = await pool.query("Select * from tbl_rol");
    return res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
