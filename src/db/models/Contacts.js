import { Schema, model } from 'mongoose';
import { CONTACT_TYPE_LIST } from '../../constants/contacts.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: CONTACT_TYPE_LIST,
      required: true,
      default: 'personal',
    },
  },
  { versionKey: false, timestamps: true },
);

export const sortByList = ['name', 'phoneNumber', 'email'];

const ContactsCollection = model('contacts', contactSchema);

export default ContactsCollection;
