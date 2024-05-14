const request = require('async-request');
const cartFacade = require('../container/cart/cart.facade');

let getDeliveryChargesData ={
    isActive: false
}

let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=km&key=AIzaSyDdRKIY1Uch89SgPt0KOqrMfVwQ8w4QqKg'
//origins=12.923439, 77.580751&destinations=Vijayanagar, Bengaluru, Karnataka&
module.exports = {
    getDistance: async (entry) => {
        const {origins, destinations} =entry;
        let newUrl =url+'&origins='+origins+'&destinations='+destinations
        let response = await request(newUrl);
        if(response['statusCode']===200){
            const {rows=[]} =JSON.parse(response['body'])
           if(rows && Array.isArray(rows) && rows.length>0){
               let {elements} =rows[0];
               if(elements && Array.isArray(elements) && elements.length>0){
                   if(elements[0]['status']==='OK'){
                      if(elements[0]['distance']['value']){
                          console.log(" tee", elements[0]['distance']['value'])
                          return elements[0]['distance']['value']
                      }
                   }
               }
           }
        }
        return 0;
    },
    calculateDeliveryChargesDistance : async (totalKm)=> {
        // if (!getDeliveryChargesData['isActive']) {
        //     getDeliveryChargesData = await cartFacade.findDistanceCharges({});
        // }
        // let deliveryCharges = 0;
        //if (getDeliveryChargesData['isActive'] && totalKm > 0) {
        //     if (totalKm > 0) {
        //     totalKm /= 1000;
        //     const {distanceRangeObject} = getDeliveryChargesData;
        //     for (let key in distanceRangeObject) {
        //         let km = distanceRangeObject[key]['end'] - distanceRangeObject[key]['start']
        //         if (totalKm > km) {
        //             deliveryCharges += km * distanceRangeObject[key]['chargesPerKm'];
        //             totalKm -= km;
        //         } else deliveryCharges += totalKm * distanceRangeObject[key]['chargesPerKm'];
        //     }
        // }
        //return {deliveryCharges: Math.ceil(deliveryCharges), vatTax: getDeliveryChargesData['vatTax']}
        return {deliveryCharges: 50.00, vatTax: 15}
    }
};
