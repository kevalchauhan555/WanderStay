const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow("",null),
        category:Joi.string().required(),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
});

module.exports.reserveSchema = Joi.object({
    reserve:Joi.object({
        checkin:Joi.date().required(),
        checkout:Joi.date().required(),
        adult:Joi.number().required().min(0).max(4),
        children:Joi.number().min(0).max(4),
        mobile:Joi.number().required(),
        
    }).required()
});