import { createTransport } from "nodemailer"
import { ISendEmailRequest } from "src/interfaces/interfaces";
import "dotenv/config"
import AppError from "../errors/appError";
import * as Mailgen from "mailgen"
import { Injectable } from "@nestjs/common";

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'M6 T13',
        link: `http://localhost:3000`

    }
});

@Injectable()
export class EmailService {


    static async sendEmail({ to, subject, text }: ISendEmailRequest) {
        const tranporter = createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })

        await tranporter.sendMail({
            from: "felipesantosdd@mail.com",
            to,
            subject,
            html: text
        }).then(() => {
            console.log("Email enviado com sucesso.")
        }).catch((err) => {
            console.log(err)
            throw new AppError("Erro ao enviar e-mail, tente novamente mais tarde", 500)
        })
    }

    static resetPasswordTemplate(userEmail: string, userName: string, protocol: string, host: string, resetToken: string) {



        const email = {
            body: {
                name: userName,
                intro: 'Você recebeu este e-mail porque uma solicitação de redefinição de senha para sua conta foi recebida.',
                action: {
                    instructions: 'Clique no botão abaixo para redefinir sua senha:',
                    button: {
                        color: '#DC4D2F',
                        text: 'Redefina sua senha',
                        link: `${protocol}://${host}/login/resetPassword/${resetToken}`
                    }
                },
                outro: 'Se você não solicitou uma redefinição de senha, nenhuma outra ação será necessária de sua parte..'
            }
        };


        const emailBody = mailGenerator.generate(email)

        const emailTemplate = {
            to: userEmail,
            subject: "Reset password",
            text: emailBody
        }

        return emailTemplate
    }

}