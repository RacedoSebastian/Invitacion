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
  const { name, confirm } = req.body;
  console.log("🚀 ~ confirmar ~ name, email, confirm:", name, confirm);
  console.log("🚀 ~ confirmar ~ confirm:", confirm);
  let respuesta;
  if (confirm.toLowerCase().includes("no puedo")) {
    respuesta =
      "Tu respuesta fue registrada: lamentamos que no puedas asistir 💙";
  } else {
    respuesta = "¡Confirmación recibida! Te esperamos en la fiesta 🎉";
  }
  try {
    const info = await transporter.sendMail({
      from: `"Invitación Juanjo" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: `De: ${name}`,
      html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Confirmación de Asistencia</title>
  <style>
    body {
      background-color: #f0f8ff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 0;
      margin: 0;
      color: #333;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 10px 25px rgba(0, 123, 255, 0.1);
      text-align: center;
    }

    h1 {
      color: #007bff;
      font-size: 28px;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 20px;
      color: #555;
      margin-bottom: 20px;
    }

    .message {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
    }

    .tag {
      display: inline-block;
      background-color: #007bff;
      color: #ffffff;
      padding: 8px 18px;
      border-radius: 20px;
      font-size: 15px;
      margin-top: 10px;
    }

    .footer {
      font-size: 12px;
      color: #999;
      margin-top: 40px;
    }

    .footer a {
      color: #007bff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>¡Confirmación Mis 50, Juanjo!</h1>

    <div class="message">
      <h2>Hola Juanjo 💙</h2>
      <p>Soy <strong>${name}</strong> y quiero decirte que:</p>
      <p><span class="tag">${confirm}</span></p>
      <p>¡Gracias por invitarme a ser parte de este momento tan especial! 🎉</p>
    </div>

    <div class="footer">
      <p>&copy; 2025 Fiesta de 50 de Juanjo</p>
      <p><a href="#">Política de Privacidad</a> | <a href="#">Términos y Condiciones</a></p>
    </div>
  </div>
</body>
</html>
`,
    });
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: respuesta });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Hubo un error al confirmar" });
  }
}

routes.post("/confirm", validate(schemaConfirm), confirmar);
