import { checkSchema } from 'express-validator';

export const CreatePackageValidator  =  checkSchema(
    {
        description: { isString: true },
        weight: { isNumeric: true },
        width: { isNumeric: true },
        height: { isNumeric: true },
        depth: { isNumeric: true },
        from_name: { isString: true },
        from_address: { isString: true },
        from_location: { isObject: true },
        'from_location.lat': { isNumeric: true },
        'from_location.lng': { isNumeric: true },
        to_name: { isString: true },
        to_address: { isString: true },
        to_location: { isObject: true },
        'to_location.lat': { isNumeric: true },
        'to_location.lng': { isNumeric: true },
    },
    ['body']
);
