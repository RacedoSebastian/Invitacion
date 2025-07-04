import express from "express";
import cors from "cors";
import { routes } from "./mailer.js";
import dotenv from "dotenv";
dotenv.config();

const options = {
  origin: [process.env.ORIGEN, "https://invitacion-juanjo.vercel.app"],
  credentials: true,
};

const app = express();
app.use(cors(options));
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
