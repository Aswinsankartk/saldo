import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Saldo API is running...");
});

export default app;
