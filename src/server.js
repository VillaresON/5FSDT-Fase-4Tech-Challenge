require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", require("./routes/authRoutes"));
app.use("/posts", require("./routes/postRoutes"));
app.use("/teachers", require("./routes/teacherRoutes"));
app.use("/students", require("./routes/studentRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
