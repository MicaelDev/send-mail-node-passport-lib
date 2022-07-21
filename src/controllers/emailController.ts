import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const contato = async (req: Request, res: Response) => {
    //Passo 1: Configurar o trasnporter
        var transport = nodemailer.createTransport({
           host: "smtp.gmail.com",
           port: 587,
           auth: {
                user: "micaelquiliao@gmail.com",
                pass: "xgjtdqjblqckrexp"
           }
        });
    //Passo 2: Confiugurar a mensagem
        let message = {
            from: 'Micael Quilião <micaelquiliao@gmail.com>',
            to: 'micaelquiliao@gmail.com',
            subject: 'Assunto legal',
            html: 'Opa <strong>Teste</strong>, como vai?',
            text: 'Opa Teste, como vai?'
        };
    //Passo 3: Enviar a mensagem
        let info = await transport.sendMail(message);
        console.log("INFO", info);

        res.json({success: true});
}