import nodemailer from "nodemailer";

import { IDadosDeEnvioDoEmail, IEnviarEmailDTO } from "./EnviarEmail.interfaces";

class EnviarEmailService {
  public async handle({ conteudo, titulo, recepitor }: IDadosDeEnvioDoEmail) {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST || "",
      port: Number(process.env.MAILER_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
      }
    });

    const message: IEnviarEmailDTO = {
      to: recepitor,
      subject: titulo,
      html: conteudo
    };

    const result = await transporter.sendMail(message);
    console.log(result);
  }
}
