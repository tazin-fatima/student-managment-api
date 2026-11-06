
import express from "express";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/students", studentRoutes);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
