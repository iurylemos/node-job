// import Mail from "../lib/Mail";
import Queue from "../lib/Queue";

export default {
  async store(req, res) {
    const { name, email, password } = req.body;

    const user = {
      name,
      email,
      password,
    };

    // Send e-mail
    // Mail.sendMail({
    //   from: "Queue Test <iury@iteris.com.br>",
    //   to: `${name} <${email}>`,
    //   subject: "Cadastro de usuário",
    //   html: `Olá, ${name}, bem vindo ao sistema de filas :D`,
    // });

    // Add job RegistrationMail on queue
    await Queue.add("RegistrationMail", { user });
    await Queue.add("UserReport", { user });

    return res.json(user);
  },
};
