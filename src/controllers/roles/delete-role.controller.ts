import { Request, Response, NextFunction } from "express";
import { Rol } from "@/models/init-models";
import { getNewResponseApi } from "@/libs/create-new-api-response";

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const roleId = req.params.id;

  try {
    if (!roleId) {
      return res.status(400).json({
        ...response,
        message: "El ID del rol es requerido.",
      });
    }

    const roleExists = await Rol.findOne({
      where: {
        id: roleId,
      },
    });

    if (roleExists) {
      return res.status(404).json({
        ...response,
        message: "Rol no encontrado o ya ha sido eliminado.",
      });
    }

    await Rol.update(
      {
        status: false,
      },
      {
        where: {
          id: roleId,
        },
      }
    );

    return res.status(200).json({
      ...response,
      succeded: true,
      message: "Rol eliminado exitosamente.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ...response,
      message: "Error al eliminar el rol.",
    });
  }
};
