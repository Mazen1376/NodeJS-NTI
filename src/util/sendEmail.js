import nodemailer from 'nodemailer'
import { emailTemaplate } from './emailTemplate.js';

//const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "Mazen1376797@gmail.com",
    pass: "useznwjlbmpbvgqq",
  }
});

export const sendEmail = async (email) => {
  const info = await transporter.sendMail({
    from: '"Mazen Yasser" <Mazen1376797@gmail.com>',
    to: email,
    subject: "plz verify ur email",
    html: emailTemaplate(email),

  });

  console.log("Message sent:", info.messageId);
}