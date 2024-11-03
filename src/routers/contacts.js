import { Router } from 'express';
import {
  getContactByIdController,
  getContactsController,
  addContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.use('/:contactId', ctrlWrapper(getContactByIdController));

router.post('/', ctrlWrapper(addContactController));

router.patch('/:id', ctrlWrapper(patchContactController));

router.delete('/:id', ctrlWrapper(deleteContactController));

export default router;
