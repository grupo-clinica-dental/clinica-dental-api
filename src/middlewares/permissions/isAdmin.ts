import { NextFunction, Request, Response } from "express";
import { ROLES } from "../../constants/roles";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response: ApiResponse<any> = {
    data: {},
    errors: null,
    message: "",
    succeded: false,
  };
  try {
    const user = req.user;

    if (user.rol === ROLES.ADMIN) {
      next();
      return;
    }
    return res
      .status(403)
      .json({ ...response, message: "No tiene permisos de administrador" });
  } catch (error) {
    return res.status(500).json({
      ...response,
      message: "Ha ocurrido un error en el lado del servidor",
      errors: [error],
    });
  }
};
