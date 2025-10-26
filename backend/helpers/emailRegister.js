import nodemailer from "nodemailer";

const emailRegister = async (data) => {

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    })

    const { email, name, token } = data;

    //Enviar Email
    const info = await transporter.sendMail({
      from: '"APV - Administrador de pacientes de veterinario" <apv@corre.com>',
      to: email,
      subject: "Comprueba tu cuenta en APV ✔",
      text: "Comprueba tu cuenta en APV",
      html: `<p>Hola: ${name}, comprueba tu cuenta APV.</p>
          <p>Tu cuenta ya esta lista, solo debes comprobarla
            en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirm/${token}"> Comprobar cuenta</a>
          </p>
          <p> Si tu no creaste esta cuenta, ingnora el mensaje</p>
    `
    })

    console.log("Mensaje enviado: %s", info.messageId);

  } catch (error) {
    console.error('Error to sending email:', error)
  }

}

export default emailRegister
