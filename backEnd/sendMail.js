const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'venkateshamulraj@gmail.com',
        pass: 'xgqltucfwmffqzmd'
    }
});

const sendMail = async (to, sub, msg) => {
    const info = await transporter.sendMail({
        from: '"Skill Sync" <venkateshamulraj@gmail.com>',
        to: to,
        subject: sub,
        html: msg
    });
};

module.exports = sendMail;
