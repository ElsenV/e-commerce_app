import nodemailer from "nodemailer";

const sendMail = async (email, resetLink) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SENDER_MAIL, // generated ethereal user
      pass: process.env.SENDER_PASSWORD, // generated ethereal password
    },
  });

  const message = `<h2>Reset Password</h2> </br>
                <p>A password change has been requested for your account.If this was you,please use link below to reset your password</p>  

                 <p>${resetLink}</p>
                `;

  let info = await transporter.sendMail({
    from: process.env.SENDER_MAIL, // sender address
    to: email, // list of receivers
    subject: "Reset Password", // Subject line
    text: `Wardrobe`, // plain text body
    html: message, // html body
  });

  return info;
};

export default sendMail;
