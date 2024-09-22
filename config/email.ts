import nodemailer from 'nodemailer';
import process from 'process';
import { readFileSync } from 'fs';

const passwordResetMail = new TextDecoder().decode(readFileSync(__dirname + "/../templates/passwordReset.html"))

console.log(process.env.EMAIL_USERNAME);
console.log(process.env.password);
var transporter = nodemailer.createTransport({
	host: "smtp.zoho.in",
	secure: true,
	port: 465,
        auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
        }
});


export const sendOtp = (otp: string, recepient: string) => {
        var mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: recepient,
                subject: "OTP for RapsApp Password Reset",
                html: passwordResetMail.replace('${otp}', otp)
        };

        transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                        console.log(error);
                } else {
                        console.log('Email sent: ' + info.response);
                }
        });
};

