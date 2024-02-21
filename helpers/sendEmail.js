import nodemailer from "nodemailer";
import "dotenv/config";

const { ELASTICEMAIL_SMTP_KEY, ELASTICEMAIL_EMAIL_FROM } = process.env;

const nodemailerConfig = {
  host: "smtp25.elasticemail.com",
  port: 2525,
  secure: false,
  auth: {
    user: ELASTICEMAIL_EMAIL_FROM,
    pass: ELASTICEMAIL_SMTP_KEY,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  from: ELASTICEMAIL_EMAIL_FROM,
  to: "xogar78146@gexige.com",
  subject: "Subj:test email",
  html: "<strong>Test email</strong>",
};

transport
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.error(error.message));
