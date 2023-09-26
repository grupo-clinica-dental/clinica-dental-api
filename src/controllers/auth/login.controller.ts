import { Request, Response } from "express";
import { User } from "@models/users/user.model";
import { getNewResponseApi } from "@/libs/create-new-api-response";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginHandler = async (req: Request, res: Response) => {
  const response = getNewResponseApi();

  try {
    const { email, password } = req.body;

    const userToFind = await User.findOne({
      attributes: ["id", "email", "name", "phone", "status", "password"],
      where: {
        email,
      },
      include: ["role"],
    });

    if (!userToFind) {
      return res.status(404).json({
        message: "Credenciales incorrectas",
      });
    }

    const validPassword = await bcrypt.compare(password, userToFind.password);

    if (!validPassword) {
      return res.status(404).json({
        message: "Credenciales incorrectas",
      });
    }

    const tokenPayload = {
      id: userToFind?.id,
      email: userToFind?.email,
      nombre: userToFind?.name,
      telefono: userToFind?.phone,
      estado: userToFind?.status,
      rol: userToFind?.role,
    };

    const TOKENSECRET = process.env.TOKEN_SECRET || "secret";

    const token: string = jwt.sign(tokenPayload, TOKENSECRET, {
      expiresIn: "8h",
    });

    return res.status(200).json({
      message: "Usuario Autenticado con exito",
      data: {
        token,
        profile: tokenPayload,
      },
      succeded: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Problema en el autenticar en el lado del servidor",
    });
  }
};
