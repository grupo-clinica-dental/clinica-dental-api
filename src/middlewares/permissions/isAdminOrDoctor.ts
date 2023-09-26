import { NextFunction, Request, Response } from "express";
import { getNewResponseApi } from "@/libs/create-new-api-response";
import { ROLES } from "@/constants/roles";

export const isAdminOrDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  const validRoles = [ROLES.DOCTOR, ROLES.ADMIN];

  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        ...response,
        message: "No se pudo encontrar un usuario en la solicitud",
      });
    }

    if (validRoles.includes(user.rol.name)) {
      next();
      return;
    }

    return res.status(403).json({
      ...response,
      message: "No tiene permisos de administrador ni de doctor",
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      message: "Ha ocurrido un error en el lado del servidor",
      errors: [error],
    });
  }
};
