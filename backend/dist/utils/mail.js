"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SendMail;
exports.SendRecoveryMail = SendRecoveryMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    secure: true,
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});
async function SendMail(to, subject, text, username) {
    try {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: to,
            subject: subject,
            html: `
              <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f1f1f1;">
                <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f1f1f1; padding: 20px;">
                    <tr>
                        <td align="center">
                            <table role="presentation" style="width: 500px; border-collapse: collapse; background-color: #ffffff; border-radius: 0px; overflow: hidden;">
                                <!-- Header -->
                                <tr>
                                    <td style="background-color: #1a1a1a; padding: 30px; text-align: center;">
                                        
                                        <h1 style="color: #ffffff; margin: 15px 0 0; font-size: 22px; font-weight: 400; letter-spacing: 0.5px;">Welcome to <strong>Life Long Learning</strong></h1>
                                    </td>
                                </tr>
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 30px; color: #333333;">
                                        <p style="font-size: 15px; line-height: 1.6; margin: 0 0 15px; font-weight: 400;">Hello [User's Name],</p>
                                        <p style="font-size: 15px; line-height: 1.6; margin: 0 0 20px;">Thank you for joining Life Long Learning. Please use the verification code below to activate your account:</p>
                                        <!-- Verification Code -->
                                        <div style="font-size: 28px; font-weight: 600; color: #1a1a1a; text-align: center; margin: 25px 0; letter-spacing: 2px; background-color: #f9f9f9; padding: 15px; border-radius: 6px;">
                                            [VERIFICATION_CODE]
                                        </div>
                                        <p style="font-size: 14px; line-height: 1.6; margin: 0 0 15px;">This code expires in <strong>10 minutes</strong>. If you didn’t request this, please ignore or contact <a href="mailto:ifo@lifelonglearning.com" style="color: #e63946; text-decoration: none;">info@lifelonglearning.com</a>.</p>
                                    </td>
                                </tr>
                                <!-- Footer -->
                                <tr>
                                    <td style="background-color: #1a1a1a; padding: 20px; text-align: center;">
                                        <p style="color: #cccccc; font-size: 13px; margin: 0 0 8px;">© 2025 Life Long Learning. All rights reserved.</p>
                                        <p style="color: #cccccc; font-size: 13px; margin: 0;">
                                            <a href="[Privacy Policy URL]" style="color: #fff; text-decoration: none; margin: 0 8px;">Privacy Policy</a> | 
                                            <a href="[Terms of Service URL]" style="color: #fff; text-decoration: none; margin: 0 8px;">Terms of Service</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            `.replace('[VERIFICATION_CODE]', text) // Replace with actual verification code
                .replace('[User\'s Name]', username) // Replace with user's name
                .replace('[Privacy Policy URL]', 'https://lifelonglearning/privacy-policy') // Replace with actual URL
                .replace('[Terms of Service URL]', 'https://lifelonglearning/terms-of-service'), // Replace with actual URL
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
}
async function SendRecoveryMail(to, subject, text, username) {
    try {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: to,
            subject: subject,
            html: `
              <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f1f1f1;">
                <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f1f1f1; padding: 20px;">
                    <tr>
                        <td align="center">
                            <table role="presentation" style="width: 500px; border-collapse: collapse; background-color: #ffffff; border-radius: 0px; overflow: hidden;">
                                <!-- Header -->
                                <tr>
                                    <td style="background-color: #1a1a1a; padding: 30px; text-align: center;">
                                        
                                        <h1 style="color: #ffffff; margin: 15px 0 0; font-size: 22px; font-weight: 400; letter-spacing: 0.5px;">Welcome to <strong>Life Long Learning</strong></h1>
                                    </td>
                                </tr>
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 30px; color: #333333;">
                                        <p style="font-size: 15px; line-height: 1.6; margin: 0 0 15px; font-weight: 400;">Hello [User's Name],</p>
                                        <p style="font-size: 15px; line-height: 1.6; margin: 0 0 20px;">Please use this verification code below to recover your account.</p>
                                        <!-- Verification Code -->
                                        <div style="font-size: 28px; font-weight: 600; color: #1a1a1a; text-align: center; margin: 25px 0; letter-spacing: 2px; background-color: #f9f9f9; padding: 15px; border-radius: 6px;">
                                            [VERIFICATION_CODE]
                                        </div>
                                        <p style="font-size: 14px; line-height: 1.6; margin: 0 0 15px;">This code expires in <strong>10 minutes</strong>. If you didn’t request this, please ignore or contact <a href="mailto:ifo@lifelonglearning.com" style="color: #e63946; text-decoration: none;">info@lifelonglearning.com</a>.</p>
                                    </td>
                                </tr>
                                <!-- Footer -->
                                <tr>
                                    <td style="background-color: #1a1a1a; padding: 20px; text-align: center;">
                                        <p style="color: #cccccc; font-size: 13px; margin: 0 0 8px;">© 2025 Life Long Learning. All rights reserved.</p>
                                        <p style="color: #cccccc; font-size: 13px; margin: 0;">
                                            <a href="[Privacy Policy URL]" style="color: #fff; text-decoration: none; margin: 0 8px;">Privacy Policy</a> | 
                                            <a href="[Terms of Service URL]" style="color: #fff; text-decoration: none; margin: 0 8px;">Terms of Service</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            `.replace('[VERIFICATION_CODE]', text) // Replace with actual verification code
                .replace('[User\'s Name]', username) // Replace with user's name
                .replace('[Privacy Policy URL]', 'https://lifelonglearning/privacy-policy') // Replace with actual URL
                .replace('[Terms of Service URL]', 'https://lifelonglearning/terms-of-service'), // Replace with actual URL
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
}
