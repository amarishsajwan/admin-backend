const Addresses = require('./myAddress.model');
const helpers = require('../../utils/helpers');

const getFieldsToUpdate = async function (entry) {

    let fields = {};
    let {
        city_id = null,
        area_id = null,
        bawsala_code_id = null,
        address_type = null,
        street_name = null,
        floor = null,
        delivery_place_name = null,
        building_no = null,
        delivery_place_number = null,
        custom_name = null,
        building_images = [],
        remove_building_images = []
    } = entry;

    if (city_id) fields = {...fields, $set: {...fields.$set || {}, city_id}}
    if (area_id) fields = {...fields, $set: {...fields.$set || {}, area_id}}
    if (bawsala_code_id) fields = {...fields, $set: {...fields.$set || {}, bawsala_code_id}}
    if (custom_name) fields = {...fields, $set: {...fields.$set || {}, custom_name}}
    if (address_type) fields = {...fields, $set: {...fields.$set || {}, address_type}}
    if (street_name) fields = {...fields, $set: {...fields.$set || {}, street_name}}
    if (floor) fields = {...fields, $set: {...fields.$set || {}, floor}}
    if (delivery_place_name) fields = {...fields, $set: {...fields.$set || {}, delivery_place_name}}
    if (building_no) fields = {...fields, $set: {...fields.$set || {}, building_no}}
    if (delivery_place_number) fields = {...fields, $set: {...fields.$set || {}, delivery_place_number}}
    if (Array.isArray(building_images) && building_images.length > 0) fields = {
        ...fields,
        $addToSet: {...fields.$addToSet || {}, building_images: {$each: building_images}}
    };
    if (Array.isArray(remove_building_images) && remove_building_images.length > 0) fields = {
        ...fields,
        $pull: {...fields.$pull || {}, building_images: {$in: remove_building_images}}
    };
    return fields
};


module.exports = {
    insertOne: async (fields) => {
        const entryToInsert = {
            ...fields,
            isDeleted: false
        };
        return await new Addresses(entryToInsert).save();

    },
    findOneAndUpdate: async function (entry, fields, options = {}) {
        return await Addresses.findOneAndUpdate(entry, {"$set": fields}, {new: true})
    },
    count: async (entry) => {
        const filter = {
            isDeleted: false,
            ...entry,
        };
        return await Addresses.count(filter);
    },
    find: async (filters, options = {}) => {
        const filter = {
            isDeleted: false,
            ...filters,
        };
        const {sort, limit, skip} = helpers.getFindParams(options);
        return await Addresses.find(filter).sort(sort).skip(skip).limit(limit)

    },
    findOne: async (filters, options = {}) => {
        const filter = {
            isDeleted: false,
            ...filters,
        };
        return await Addresses.findOne(filter);

    },
    deleteOne: async (entry) => {
        return await Addresses.updateOne(entry, {"$set": {isDeleted: true}}, {new: true})
    },
    updateMany: async (filters, filedToUpdate) => {
        const filter = {
            isDeleted: false,
            ...filters,
        };
        return await Addresses.updateMany(filter, {"$set": filedToUpdate});

    },
};

