import { Request, Response } from "express";

export const profileHandler = (req: Request, res: Response) => {
  const user = req.user;
  const profileResponse = {
    user,
    message: "Profile data",
  };
  res.status(200).json(profileResponse);
};
