import { Request, Response } from "express";
import { User } from "../../types/user/user.interface";
import { getNewResponseApi } from "../../libs/create-new-api-response";

export const profileHandler = (req: Request, res: Response) => {
  const user: User = req.user;

  const response = getNewResponseApi<User>();

  if (!user) {
    return res.status(400).json({
      ...response,
      message: "Error: Usuario no encontrado.",
      succeded: false,
    });
  }

  res.status(200).json({
    ...response,
    data: { user },
    message: "Perfil del usuario con id: " + user.id,
    succeded: true,
  });
};
