import { checkSchema } from 'express-validator';
import { DeliveryStatus } from '../../types/common';

export const CreateDeliveryValidator  =  checkSchema(
    {
        package_id: { isString: true },
        pickup_time: { 
            isString: true,
            // isDate: {options:{format:"YYYY-mm-dd"}}, 
            optional: { options : { values : "falsy" }}
         },
        start_time: { 
            isString: true,
            // isDate: {options:{format:"YYYY-mm-ddTHH:MM:ssZ"}}, 
            optional: { options : { values : "falsy" }}
        },
        end_time: { 
            isString: true,
            // isDate: {options:{format:"YYYY-mm-ddTHH:MM:ssZ"}}, 
            optional: { options : { values : "falsy" }},
        },
        status: {
            toLowerCase:true, 
            isIn: {options:[Object.values(DeliveryStatus)]}, 
            optional: { options : { values : "falsy" }}
        },
        // location: {  isObject: true },
        // 'location.lat': { isNumeric: true },
        // 'location.lng': { isNumeric: true },
    },
    ['body']
);
