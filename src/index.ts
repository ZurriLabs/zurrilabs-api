import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import contactRoutes from "./routes/contact";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("ZURRI API");
});

app.use("/contact", contactRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log("API running");
});