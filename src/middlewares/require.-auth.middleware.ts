import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  const response: ApiResponse<any> = {
    data: {},
    errors: null,
    message: "",
    succeded: false,
  };

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

  jwt.verify(token, "secret", (err, user) => {
    if (err)
      return res.status(401).json({
        ...response,
        message: "Usted no esta autorizado",
      });

    req.user = user;

    next();
  });
};
