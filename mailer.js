import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

import { schemaConfirm, validate } from "./schema.js";

dotenv.config();

export const routes = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function confirmar(req, res) {
  const { name, email, confirm } = req.body;
  console.log("🚀 ~ confirmar ~ name, email, confirm:", name, email, confirm);
  try {
    const info = await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: `De: ${name}`,
      html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Registro</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .email-container {
            background-color: #ffffff;
            margin: 20px;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            text-align: center;
        }
        .confirm-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #28a745;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            font-size: 16px;
        }
        .footer {
            color: #666666;
            font-size: 12px;
            margin-top: 20px;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h1>¡Gracias por la invitacion!</h1>
        <p>Hola undefine soy ${name}</p>
        <p>${confirm}</p>
        <div class="footer">
            <p>&copy; 2024. Todos los derechos reservados.</p>
            <p><a href="https://www.example.com/politica-de-privacidad">Política de Privacidad</a> | <a href="https://www.example.com/terminos-y-condiciones">Términos y Condiciones</a></p>
        </div>
    </div>
</body>
</html>`,
    });
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: "confirmado correctamente" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Hubo un error al confirmar" });
  }
}

routes.post("/confirm", validate(schemaConfirm), confirmar);
