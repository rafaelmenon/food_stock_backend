import jwt from "jsonwebtoken";

export const verifyToken = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).send({ message: "Token é obrigatório" });

    const replace = token.replace("Bearer ", "");
    const decoded = jwt.verify(replace, String(process.env.TOKEN_KEY));
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send(e);
  }
};
