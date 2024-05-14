const request = require('request');
const { Checkout } = require('checkout-sdk-node');

/** Go to checkout.com and sign up for a test account to get your own key.*/
const cko = new Checkout('sk_test_9fb7e266-7b78-42ca-999a-fc54df5cadce');

let url="https://api.sandbox.checkout.com"
/**
 * Keep in mind that requests with raw card details
 * requre a high level of PCI Compliance.
 */

module.exports={
    paymentWithToken: async (cardToken)=>{
        return  await cko.payments.request({
            source: {
                token: cardToken,
            },
            currency: 'EUR',
            amount: 1000, // cents
            reference: 'ORDER123',
            requiresRedirect: true,
        });
    },
    paymentWithCardId: async (cardId)=>{
      return   await cko.payments.request({
            source: {
                id: cardId,
            },
            currency: 'EUR',
            amount: 1000, // cents
            reference: 'ORDER123',
            requiresRedirect: true,
        });
    },
    getCustomerCard : async (customerId='cus_fuczleqniqeehbmwfnqndss5wm') => {
        return await new Promise((resolve, reject) => {
            request.get({url:url+'/customers/'+customerId,
                headers: {
                    'Authorization': 'sk_test_9fb7e266-7b78-42ca-999a-fc54df5cadce'
                }
            }, (err, response, body) => {
                if (err ) {
                   return  reject(err);
                }
                if(body){
                    return resolve(JSON.parse(body))}
                else  {
                    reject({message:"get error"})};

            })
        });
    },
    createInstruments : async (Instrument) => {
        return await new Promise((resolve, reject) => {
            request.post({
                url: url + '/instruments',
                headers: {
                    "content-type": "application/json",
                    'Authorization': 'sk_test_9fb7e266-7b78-42ca-999a-fc54df5cadce'
                },
                body: JSON.stringify(Instrument)
            }, (err, response, body) => {
                if (err ) {
                    return  reject(err);
                }
                if(body){
                    return resolve(JSON.parse(body))}
                else  {
                    reject({message:"get error"})};

            })
        });
    },
    deleteInstruments : async (instrumentId) => {
        return await new Promise((resolve, reject) => {
            request.delete({
                url: url + '/instruments/' + instrumentId,
                headers: {
                    'Authorization': 'sk_test_9fb7e266-7b78-42ca-999a-fc54df5cadce'
                }
            }, (err, response, body) => {
                if (err) {
                    return reject(err);
                }
                if (response.statusCode === 204) {
                    return resolve({message:"succesfully removed"})
                } else if(response.statusCode === 404){
                    return resolve({message:"card already removed"})
                }
                reject({message:"get error"});
            })
        });
    }
};