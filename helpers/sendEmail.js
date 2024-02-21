import nodemailer from "nodemailer";
import "dotenv/config";

const { ELASTICEMAIL_SMTP_KEY, ELASTICEMAIL_EMAIL_FROM } = process.env;

const nodemailerConfig = {
  host: "smtp.elasticemail.com",
  port: 2525,
  secure: false,
  auth: {
    user: ELASTICEMAIL_EMAIL_FROM,
    pass: ELASTICEMAIL_SMTP_KEY,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);


const sendEmail = data => {
    const email = {...data, from: ELASTICEMAIL_EMAIL_FROM};
    return transport.sendMail(email)
}

export default sendEmail;
