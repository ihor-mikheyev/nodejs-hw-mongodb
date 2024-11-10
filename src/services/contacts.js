import ContactsCollection from '../db/models/Contacts.js';

export const getContacts = () => ContactsCollection.find();

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
