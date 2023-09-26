import { NextFunction, Request, Response } from "express";
import { Rol } from "@/models/init-models";
import { getNewResponseApi } from "@/libs/create-new-api-response";

export const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const roleId = req.params.id;

  if (!roleId) {
    return res.status(400).json({
      ...response,
      message: "Por favor indique el rol que desea obtener.",
    });
  }

  try {
    const fountRol = await Rol.findOne({
      where: {
        id: roleId,
      },
    });

    if (!fountRol) {
      return res.status(404).json({
        ...response,
        message: "Rol no encontrado o ya ha sido eliminado.",
      });
    }

    return res.status(200).json({
      ...response,
      succeded: true,
      data: fountRol,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al obtener el role.",
    });
  }
};
