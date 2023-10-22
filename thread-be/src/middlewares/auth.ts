import { NextFunction, Request, Response } from "express";
import jwt = require("jsonwebtoken");

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const autholizationHeader = req.headers.authorization;

  if (!autholizationHeader || !autholizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Unauthorization",
    });
  }

  const token = autholizationHeader.split(" ")[1];

  try {
    const loginSession = jwt.verify(token, "pastibisa");
    res.locals.loginSession = loginSession;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default authenticate;
