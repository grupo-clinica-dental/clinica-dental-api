import { NextFunction, Request, Response } from "express";
import { Rol } from "@/models/init-models";
import { getNewResponseApi } from "@/libs/create-new-api-response";

export const getAllRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    const roles = await Rol.findAll({
      where: {
        status: true,
      },
    });

    if (!roles) {
      return res.status(404).json({
        ...response,
        message: "No se encontraron roles.",
        data: [],
      });
    }

    return res.status(200).json({
      ...response,
      succeded: true,
      data: roles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al obtener roles.",
      errors: [error],
    });
  }
};
