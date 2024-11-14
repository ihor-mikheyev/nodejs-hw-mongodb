import Joi from 'joi';
import { CONTACT_TYPE_LIST } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({ 'any.required': `Please input a name` }),
  phoneNumber: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({ 'any.required': `Please input a phone number` }),
  email: Joi.string()
    .email({ minDomainSegments: 1 })
    .messages({ 'any.required': `Please input an email` }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...CONTACT_TYPE_LIST),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email({ minDomainSegments: 1 }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...CONTACT_TYPE_LIST),
});
