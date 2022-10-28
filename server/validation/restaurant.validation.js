import joi from 'joi';

export const ResCityValidation = (restaurantObject) => {
    const Schema = joi.object({
        city: joi.string().required(),
    });

    return Schema.validateAsync(restaurantObject);
}

export const SearchValidation = (resObject) => {
    const Schema = joi.object({
        searchString: joi.string().required(),
    });

    return Schema.validateAsync(resObject);
}