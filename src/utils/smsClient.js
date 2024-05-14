const twilio = require('twilio');
const constants = require('./constants');
const request = require('async-request');

const client = new twilio(constants.TWILIO_ACCOUNT_SID, constants.TWILIO_AUTH_TOKEN);

let smsUrl = 'http://meapi.myvaluefirst.com/smpp/sendsms?username=' + constants.VFIRST_USERNAME + '&password=' + constants.VFIRST_PASSWORD + '&from=BAWSALA&coding=3&to=+966'

module.exports = {
    SendSms: async (entry, otp) => {

        const {country_code, contact_no, type, platform} = entry;
        let message = null;
        switch (type) {
            case 'register':
                message = 'Use ' + otp + ' as your verification code on bawsala';
                break;
            case 'passwordReset':
                message = 'Use ' + otp + ' as your reset password code on bawsala';
                break;
            case 'changeContact':
                message = 'Use ' + otp + ' as your change contact number code on bawsala';
                break;

            case 'login':
                message = 'Use ' + otp + ' as your login code on bawsala';
                break;

        }
        if (platform === 'ANDROID') {
            message = '[] HK_Kitchen: ' + message + '. Pn36N9lWC2S'

        }
        if (message) {
            if (country_code === '+966') {
                const url = smsUrl + contact_no + '&text=' + encodeURI(message) + 'as'
                let response = await request(url);
                if (response.body == !'Sent.' || response.statusCode == !'Sent.') {
                    console.log("response", response)
                }

            } else {
                client.messages.create({
                    body: message,
                    to: country_code + contact_no,  // Text this number
                    from: '+16502268070' // From a valid Twilio number
                }, function (err, data) {
                    if (err) {
                        console.log("err", err)
                    }
                });
            }

        }
    }
};
