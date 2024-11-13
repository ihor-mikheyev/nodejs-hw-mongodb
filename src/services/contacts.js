import ContactsCollection from '../db/models/Contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page,
  perPage,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const skip = (page - 1) * perPage;

  const data = await ContactsCollection.find()
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(perPage)
    .exec();

  const totalItems = await ContactsCollection.countDocuments();

  const paginationData = calculatePaginationData({
    count: totalItems,
    page,
    perPage,
  });

  return {
    data,
    ...paginationData,
  };
};
export const getContactById = (id) => ContactsCollection.findById(id);

export const addContact = (payload) => {
  return ContactsCollection.create(payload);
};

export const updateContact = async ({ _id, payload, options = {} }) => {
  const data = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    ...options,
    new: true,
    includeResultMetadata: true,
  });

  if (!data || !data.value) return null;

  return {
    data: data.value,
    isNew: Boolean(data?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (filter) => {
  return ContactsCollection.findByIdAndDelete({
    _id: filter,
  });
};
