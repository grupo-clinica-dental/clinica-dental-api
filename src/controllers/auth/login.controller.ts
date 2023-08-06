import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../../database";

export const loginHandler = async (req: Request, res: Response) => {
  // recibimos datos procesamos el request body
  // body = {email: ???, password: ???}
  //// VALIDACIONES manuales o con librerias como express generator, zod etc
  //Store in database
  //GENERATE TOKEN
  console.log(req.body);

  try {
    const { email, password } = req.body;

    const query =
      "SELECT * FROM tbl_usuarios WHERE email = $1 AND password = $2";
    const values = [email, password];
    const result = await pool.query(query, values);

    if (result.rows.length <= 0) {
      return res.status(401).json({ message: "Unathorized" });
    }

    const token = jwt.sign(
      {
        email: email,
        password: password,
      },
      "secret",
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Somethin went wrong on the server side" });
  }
};
