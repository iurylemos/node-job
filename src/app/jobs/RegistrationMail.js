import Mail from "../lib/Mail";

export default {
  key: "RegistrationMail",
  async handle({ data }) {
    const {
      user: { name, email },
    } = data;

    await Mail.sendMail({
      from: "Queue Test <iury@iteris.com.br>",
      to: `${name} <${email}>`,
      subject: "Cadastro de usuário",
      html: `Olá, ${name}, bem vindo ao sistema de filas :D`,
    });
  },
};
