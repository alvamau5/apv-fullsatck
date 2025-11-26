import nodemailer from "nodemailer";

const emailForgetPassword = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const { email, name, token } = data;

    //Enviar Email
    const info = await transporter.sendMail({
      from: '"APV - Administrador de pacientes de veterinario" <apv@corre.com>',
      to: email,
      subject: "Quieres reestablecer tu contraseña?",
      text: "Recupera tu contraseña",
      html: `<p>Hola: ${name}, has solicitado reestablecer tu contraseña.</p>
          <p>Para reestablecer tu contraseña haz click
            en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/forget-password/${token}"> Reestablecer Rontraseña</a>
          </p>
          <p> Si tu no has solicitado reestablecer tu contraseña, ingnora el mensaje</p>
    `,
    });

    console.log("Mensaje enviado: %s", info.messageId);
  } catch (error) {
    console.error("Error to sending email:", error);
  }
};

export default emailForgetPassword;
