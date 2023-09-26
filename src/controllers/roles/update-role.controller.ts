import { getNewResponseApi } from "@/libs/create-new-api-response";
import { Rol } from "@/models/init-models";
import { Request, Response, NextFunction } from "express";

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const roleId = req.params.id;
  const { name } = req.body;

  try {
    if (!name || !roleId) {
      return res.status(400).json({
        ...response,
        message: "El nombre del rol y el ID son requeridos.",
      });
    }

    // Verificamos primero si el rol existe y está activo
    const rolToUpdate = await Rol.findOne({
      where: {
        id: roleId,
        status: true,
      },
    });

    if (!rolToUpdate) {
      return res.status(404).json({
        ...response,
        message: "Rol no encontrado o ya ha sido eliminado.",
      });
    }

    rolToUpdate.name = name;
    rolToUpdate.save();

    return res.status(200).json({
      ...response,
      succeded: true,
      message: "Rol actualizado exitosamente.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al actualizar el rol.",
      errors: [error],
    });
  }
};
