const nodemailer = require("nodemailer");
const constants = require('./constants');

let transporter = nodemailer.createTransport({
    host: constants.MAIL_HOST,
    port: constants.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: constants.MAIL_USERNAME, // generated ethereal user
        pass: constants.MAIL_PASSWORD // generated ethereal password
    }
});

module.exports = {
    inviteUsers: async (entry) => {
        transporter.sendMail({
            from: constants.MAIL_FROM_NAME + '<' + constants.MAIL_FROM_ADDRESS + '>', // sender address
            to: entry.email, // list of receivers
            subject: "Administrator", // Subject line
            text: "Hello world?", // plain text body
            html: `Hi, <a href="${constants.SERVER_URL + "/customer/verify/" + entry.mailToken + "/email"}">click here</a> to accept the invitation`
        });
    }
};
