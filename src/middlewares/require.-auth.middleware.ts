import { getNewResponseApi } from "@/libs/create-new-api-response";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  const response = getNewResponseApi();

  // debe ir en los headers de la solicitud

  // validar base de datos si el token esta activo

  if (!authHeader)
    return res.status(401).json({
      ...response,
      message: "Falta encabezado de autorización",
    });

  const token = authHeader.split(" ")[1];

  // headers AUTHORIZATION = 'Bearer laksfhjasklfa564'

  if (!token)
    return res.status(401).json({
      ...response,
      message: "Usted no esta Autorizado",
    });

  // si solo viene el bearer sin el token no pasara

  const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({
        ...response,
        message: "Usted no esta autorizado",
      });

    req.user = user;

    next();
  });
};
