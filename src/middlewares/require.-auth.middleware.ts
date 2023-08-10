import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // debe ir en los headers de la solicitud

  // validar base de datos si el token esta activo

  if (!authHeader)
    return res.status(401).json({
      message: "Unathorized",
    });

  const token = authHeader.split(" ")[1];

  console.log(`{AUTH MIDDLEWARE}`, token);

  // headers AUTHORIZATION = 'Bearer laksfhjasklfa564'

  if (!token)
    return res.status(401).json({
      message: "Unathorized",
    });

  // si solo viene el bearer sin el token no pasara

  jwt.verify(token, "secret", (err, user) => {
    if (err)
      return res.status(401).json({
        message: "Unathorized",
      });

    console.log(`[AUTH-MIDDLEWARE]`, user);

    req.user = user;

    next();
  });
};
