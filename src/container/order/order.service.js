const facade = require('./order.facade');
const exceptionHandler = require('../../utils/exceptionHandler');
const validator = require('./order.validator');
const cartFacade = require('../cart/cart.facade');
const helpers = require('../../utils/helpers')
const kitchenFacade = require('../kitchen/kitchen.facade')
const myAddressFacade = require('../myAddress/myAddress.facade');
const checkoutClient = require('../../utils/checkoutClient');
const paymentFacade = require('../payment/payment.facade');
const {getDistance, calculateDeliveryChargesDistance} =require('../../utils/googleMapClient');

const socketIoClient = require('../../utils/socketIoClient')

const {ObjectId} = require('mongodb')





module.exports = {
    create: async (userInfo, body) => {
        const userId = userInfo['_id']
        const {error} = validator.validateToCreate(body)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);

        let items = body['items'].map(entry => {
            if (entry['addOnItemIds'] && Array.isArray(entry['addOnItemIds']) && entry['addOnItemIds'].length > 0)
                entry['addOnItemIds'] = entry['addOnItemIds'].map(id => {
                    if (!helpers.isValidMongoId(id)) exceptionHandler.throwError("invalid extra item id ")
                    return ObjectId(id)
                });
            return entry;
        });
        let cartIds = [];

        if (body['cartIds'] && Array.isArray(body['cartIds']) && body['cartIds'].length > 0)
            cartIds = body['cartIds'].map(id => ObjectId(id))
        const {addressId} = body;

            let myAddress = await myAddressFacade.findOne({_id: ObjectId(addressId), createdBy: userId})
            if (!myAddress) exceptionHandler.throwError("invalid_address");
            body['address'] = {
                houseOrFlatNumber: myAddress['houseOrFlatNumber'] || '',
                landmark: myAddress['landmark'] || '',
                type: myAddress['type'] || '',
                fullAddress: myAddress['fullAddress'] || '',
                location: myAddress['location'] || '',
                cityName: myAddress['cityName'] || '',
                countryName: myAddress['countryName'] || '',
                areaName: myAddress['areaName'] || '',
                zipCode: myAddress['zipCode'] || '',
            }

            let kitchen = await kitchenFacade.findOne({_id: ObjectId(body['kitchenId'])})
            if (!kitchen) exceptionHandler.throwError("invalid_kitchen");
            body['kitchenAddress'] = kitchen['address']
        let origins = kitchen['address']['location']['coordinates'][0] + ',' + kitchen['address']['location']['coordinates'][1];
        let destinations = myAddress['location']['coordinates'][0] + ',' + myAddress['location']['coordinates'][1];
        //let distance = await getDistance({origins, destinations})
        let result = await calculateDeliveryChargesDistance(5)
        body['deliveryCharges'] = result['deliveryCharges']
        body['vatTax'] = result['vatTax']
        const {cardToken = null, cardId=null} =body
        let trasectioData={}
        if(cardToken || cardId){
            // let paymetData={};
            // if(cardToken){
            //     paymetData= await checkoutClient.paymentWithToken(cardToken)
            // }else if(cardId){
            //     paymetData= await checkoutClient.paymentWithCardId(cardId)
            // }

            // if(paymetData['status']==='Authorized') {
            //     trasectioData['transactionId'] = paymetData['_id'];
            //     trasectioData['actionId'] = paymetData['action_id'];
            //     trasectioData['amount'] = paymetData['amount'];
            //     trasectioData['currency'] = paymetData['EUR'];
            //     trasectioData['srcId'] = paymetData['source']['id'];
            // }else exceptionHandler.throwError("payment_issue");

        }

        let data = await facade.insertOne({
            ...body,
            items,
            cartIds,
            orderBy: userId,
            orderId: await kitchenFacade.createOrderId({_id: ObjectId(body['kitchenId'])})
        });


        // send request
        if (data) {
            // trasectioData['userId'] = userId;
            // trasectioData['orderId'] =  data['_id'];
            // await paymentFacade.insertMany(trasectioData);
            await cartFacade.updateMany({orderBy: userId})
        }
        socketIoClient.send({
            kitchenId: body['kitchenId'],
            title: "New order!",
            message: "There is a new order for your kitchen!",
            orderId: data['_id'],
            customOrderId: data['orderId'],
            userId
        })
        return data;


    },
    find: async (userId, options) => {
        const {error} = validator.validateFindOptions(options)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);
        const {status = null, search} = options
        let filters = {
            orderBy: userId,
        };
        if (search) {
            filters['$or'] = [{'items.itemName': {$regex: search, $options: 'i'}},
                {'orderId': {$regex: search, $options: 'i'}}]
        }
        if (status) filters['status'] = {"$in": status.split(",")}
        return {
            results: await facade.find(filters, options),
            totalCount: await facade.count(filters)
        }
    },
    delete: async (userId, id) => {

        if (!helpers.isValidMongoId(id)) {
            exceptionHandler.throwError("invalid_id")
        }
        const updatedResponse = await facade.deleteOne({
            orderBy: userId,
            _id: id
        })
        if (updatedResponse.nModified != 1) {
            return exceptionHandler.throwError()
        }
    },
    addReview:
        async (id, userId, fields) => {
            if (!helpers.isValidMongoId(id)) {
                exceptionHandler.throwError("invalid_cart_item_id")
            }

            const {error} = validator.validateToAddReview(fields)
            if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);
            let filter = {
                _id: ObjectId(id),
                orderBy: userId
            };
            const {rating, comment} = fields

            let updateAddress = await facade.findOneAndUpdate(filter, {
                customerRating: rating,
                customerComment: comment
            });
            if (!updateAddress) exceptionHandler.throwError("invalid_cart_item_id")
            return updateAddress;

        },
    findOne: async (userId, id) => {
        if (!helpers.isValidMongoId(id)) {
            exceptionHandler.throwError("invalid_address_place_id")
        }
        let filters = {
            _id: ObjectId(id),
            orderBy: userId
        };
        let [data] = await facade.findDetails(filters)
        return data;
    }
};