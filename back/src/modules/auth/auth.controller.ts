import { AuthRegisterBody } from "@/types/auth.types";
import { Express, Request, Response } from "express";
import { login, register } from "./auth.services";
import { requireLogin } from "./auth.middleware";

export function registerAuthRoutes(app: Express) {
  // on enregistre une route /auth/register
  // .                                        TypeParams, TypeQuery, TypeBody
  app.post("/auth/register", async (req: Request<unknown, unknown, AuthRegisterBody>, res: Response) => {
    // on call le service auth.register
    const result = await register(req.body);

    // on set un cookie si on a un token dans le result
    if (result.token) {
      res.cookie("token", result.token, { expires: new Date(+new Date() + 1000000000), sameSite: "none" });
    }
    // on reponds a la requete http avec le result
    res.json(result);
  });

  app.post("/auth/login", async (req, res) => {
    const result = await login(req.body);
    // on set un cookie si on a un token dans le result
    if (result.token) {
      res.cookie("token", result.token, {
        expires: new Date(+new Date() + 1000000000),
        sameSite: "none",
        secure: true,
      });
    }
    res.json(result);
  });

  app.get("/auth/me", requireLogin, (req, res) => {
    res.json(req.user);
  });

  const express = require('express');
  const nodemailer = require('nodemailer');
  const PORT = 3000;

  app.use(express.json());

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jessica.damore74@ethereal.email',
        pass: 'XPd3Tn5cj8tMrxTWS6'
    }
  });

  app.post('/envoyer-email-verification', async (req, res) => {
    const { destinataire } = req.body;
    const corps = `
      <p>Merci de vérifier votre adresse e-mail.</p>
      <button style="padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px;" onclick="validerVerification()">Valider</button>
      <script>
        function validerVerification() {
          // Ajoutez ici la logique pour traiter la validation de l'e-mail de vérification
          alert('E-mail de vérification validé!');
        }
      </script>
    `;

    const message = {
      from: 'discodingdiscord@gmail.com',
      to: destinataire,
      subject: 'Vérification d\'adresse e-mail',
      html: corps
    };

    const sendMailPromise = new Promise((resolve, reject) => {
      transporter.sendMail(message, (erreur: any, info: { response: string }) => {
        if (erreur) {
          console.log(erreur);
          reject('Erreur lors de l\'envoi de l\'e-mail.');
        } else {
          console.log('E-mail de vérification envoyé : ' + info.response);
          resolve('E-mail de vérification envoyé avec succès.');
        }
      });
    });

    try {
      const resultat = await sendMailPromise;
      res.status(200).send(resultat);
    } catch (erreur) {
      res.status(500).send(erreur);
    }
  });

  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  });
}
