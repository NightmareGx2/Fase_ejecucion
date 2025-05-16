import nodemailer from "nodemailer"; 
import crypto from "crypto"; 
import jsonwebtoken from "jsonwebtoken"; 
import bcryptjs from "bcryptjs"; 

import clientsModel from "../models/customers.js";
import { config } from "../config.js";


const registerClientsController = {};

registerClientsController.register = async (req, res) => {
  
  const {
    name,
    email,
    telephone,
    address,
    password,
    dui
  } = req.body;

  try {
    //1- Verificar si el cliente ya existe
    const existsClient = await clientsModel.findOne({ email });
    if (existsClient) {
      return res.json({ message: "Client already exists" });
    }

    //2- Encriptar contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    //3- Guardamos al nuevo cliente
    const newClient = new clientsModel({
      name,
      name,
      email,
      telephone,
      address,
      password: passwordHash,
      dui: dui || null,
      isVerified: isVerified || false,
    });

    await newClient.save();


    const verificationCode = crypto.randomBytes(3).toString("hex");

    const tokenCode = jsonwebtoken.sign(
      { email, verificationCode },
      config.JWT.secret,
      { expiresIn: "1h" }
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

    //Enviar correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.emailUser.user_email,
        pass: config.emailUser.user_pass,
      },
    });

    const mailOptions = {
      from: config.emailUser.user_email,
      to: email,
      subject: "Verificacion de cuenta",
      text:
        "Para verificar tu cuenta, utiliza este codigo: " +
        verificationCode +
        "expira en 1 hora",
    };

    // 3- Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("error" + error);
      res.json({ message: "Email enviado" + info });
    });
    res.json({ message: "Client registrado, por favor registre su correo electronico." });
  } catch (error) {
    console.log("error" + error);
    res.json({ message: "Error" + error });
  }
};

//verificando codigo 

registerClientsController.verifyCodeEmail = async (req, res) => {
  const { verificationCodeRequest } = req.body;
  const token = req.cookies.verificationToken;
  const decoded = jsonwebtoken.verify(token, config.JWT.secret);
  const { email, verificationCode: storedCode } = decoded;
  if (verificationCodeRequest !== storedCode) {
    return res.json({ mesage: "Codigo invalido." });
  }
  const client = await clientsModel.findOne({ email });
  client.isVerified = true;
  await client.save();
  res.clearCookie("verificationToken");
  res.json({ message: "Email verificado" });
};

export default registerClientsController;
