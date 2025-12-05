const jwt = require("jsonwebtoken");

module.exports = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "Token mal formado" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // GUARDA ID e ROLE do usuário no req.user

      // Verifica roles permitidos
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Acesso negado" });
      }

      next();
    } catch (err) {
      console.error("auth middleware error:", err);
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }
  };
};
