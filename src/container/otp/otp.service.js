const facade = require('./otp.facade');
const helper = require('../../utils/helpers');
const smsClient = require('../../utils/smsClient');

module.exports={
    findOne:async (entry)=>{
     return facade.findOne(entry)
    },
    insertOne:async (fields)=>{
        const otp = await helper.generateOtp();
        let createToField={
            ...fields,
            otp,
            verified:false
        };
         await facade.insertOne(createToField);
         await smsClient.SendSms(fields,otp);
    },
    update:async (entry, fields)=>{
       return await facade.update(entry,fields);
    }
};
