const nodemailer = require("nodemailer");

exports.sendMail = async function(to, subject, html) {
    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.free.fr",
            port: 587,
            tls: true,
            auth: {
                user: process.env.EMAIL_ADDRESS, 
                pass: process.env.EMAIL_PASSWORD, 
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Suzanne WOA" <suzannewoa@free.fr>', // sender address
            to, // list of receivers
            subject,
            html,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}