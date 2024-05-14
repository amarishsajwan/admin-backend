const facade = require('./cart.facade');
const orderFacade = require('../order/order.facade');
const kitchenFacade = require('../kitchen/kitchen.facade');
const myAddressFacade = require('../myAddress/myAddress.facade');
const exceptionHandler = require('../../utils/exceptionHandler');
const validator = require('./cart.validator');
const helpers = require('../../utils/helpers');
const {ObjectId} = require('mongodb');
const {getDistance, calculateDeliveryChargesDistance} =require('../../utils/googleMapClient');

module.exports = {
    createFromPastOrder: async (userId, entryToCreate) => {
        let {orderId = []} = entryToCreate;
        if (!helpers.isValidMongoId(orderId)) {
            exceptionHandler.throwError("invalid_id")
        }
        let orderData = await orderFacade.findOne({_id: ObjectId(orderId), orderBy: userId})
        if (!orderData) exceptionHandler.throwError("invalid_id")
        const {cartIds = []} = orderData;
        if (cartIds && Array.isArray(cartIds) && cartIds.length > 0) {
            let data = await facade.findInternally({_id: {"$in": cartIds}})
            if (data && Array.isArray(data) && data.length > 0) {
                data = JSON.parse(JSON.stringify(data))
                let results = await facade.insertMany(data)
                return {
                    results,
                    totalCount: results.length
                }
            } else exceptionHandler.throwError("cart item not found")
        } else exceptionHandler.throwError("cart item not found")


    },
    create: async (userId, entryToCreate) => {

        const {error} = validator.validateToCreate(entryToCreate)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);

        let {addOnItemIds = []} = entryToCreate;
        let itemsId = []
        if (Array.isArray(addOnItemIds) && addOnItemIds.length > 0) {
            itemsId = addOnItemIds.map(id => {
                if (!helpers.isValidMongoId(id)) exceptionHandler.throwError("invalid extra item id ")
                return Object(id)

            })
        }
        return await facade.insertOne({...entryToCreate, addOnItemIds: itemsId, orderBy: userId})


    },
    find: async (userId, options) => {
        const {error} = validator.validateFindOptions(options)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);
        let filters = {orderBy: userId};
       let results= await facade.find(filters, options);
       let deliveryCharges=0;
       let  vatTax = 1;
       if(results.length>0) {
           const {kitchenId} = results[0];
           const {customerAddressId, longitude, latitude = null} = options
           let kitchen = await kitchenFacade.findOne({_id: kitchenId, "isDeleted": false})
           if (kitchen) {
               const {address} = kitchen;
               if (latitude) {
                   let origins = parseFloat(latitude) + ',' + parseFloat(longitude);
                   let destinations = address['location']['coordinates'][0] + ',' + address['location']['coordinates'][1];
                   if (customerAddressId) {
                       let myAddress = await myAddressFacade.findOne({
                           _id: ObjectId(customerAddressId)
                       });
                       if (myAddress) origins = myAddress['location']['coordinates'][0] + ',' + myAddress['location']['coordinates'][1];
                   }
                   let distance = await getDistance({origins, destinations})
                   let result = await calculateDeliveryChargesDistance(distance )
                   vatTax = result['vatTax'];
                   deliveryCharges = result['deliveryCharges']
               }
           }
       }
        return {
            results,
            totalCount: await facade.count(filters),
            deliveryCharges,
            vatTax
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
    update: async (id, userId, fields) => {

        if (!helpers.isValidMongoId(id)) {
            exceptionHandler.throwError("invalid_cart_item_id")
        }

        const {error} = validator.validateToUpdate(fields)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);
        let filter = {
            _id: id,
            orderBy: userId
        };

        let updateAddress = await facade.findOneAndUpdate(filter, fields);
        if (!updateAddress) exceptionHandler.throwError("invalid_cart_item_id")
        return updateAddress;

    },
};