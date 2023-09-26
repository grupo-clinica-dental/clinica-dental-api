import { getNewResponseApi } from "@/libs/create-new-api-response";
import { Rol } from "@/models/init-models";
import { Request, Response, NextFunction } from "express";

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const { name } = req.body;

  try {
    // Validamos que el nombre del rol esté presente en la solicitud
    if (!name) {
      return res.status(400).json({
        ...response,
        message: "El nombre del rol es requerido.",
      });
    }

    // Verificamos si ya existe un rol con el mismo nombre
    const roleExists = await Rol.findOne({
      where: {
        name,
      },
    });

    if (roleExists) {
      return res.status(400).json({
        ...response,
        message: "Ya existe un rol con ese nombre.",
      });
    }

    const newRol = await Rol.create({
      name,
    });

    return res.status(201).json({
      ...response,
      succeded: true,
      message: "Rol creado exitosamente.",
      data: newRol,
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      message: "Error al crear el rol.",
    });
  }
};
