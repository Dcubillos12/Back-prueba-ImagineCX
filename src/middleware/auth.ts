import { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Verifica que el encabezado Authorization esté presente
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(400).json({ message: "Error, falta autenticarse" });
  }

  // Extrae y decodifica el valor de la autenticación básica
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
  const [username, password] = credentials.split(":");

  // Verifica las credenciales
  if (username === "ICXCandidate" && password === "Welcome2024") {
    next(); // Autenticación exitosa, pasa al siguiente middleware
  } else {
    res.status(400).json({ message: "Error, falta autenticarse" }); // Autenticación fallida
  }
};

export default auth;
