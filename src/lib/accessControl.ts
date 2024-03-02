import { Role } from '@prisma/client';
import { AccessControl } from 'accesscontrol';

let grantsObject = {
  [Role.USER]: {
    categories: { 'read:any': ['*'] },
    books: {
      'create:any': ['*'],
      'read:any': ['*', '!addedBy', '!createdAt', '!udpatedAt']
    },
    userLibraryBooks: {
      'create:own': ['*'],
      'read:own': ['*'],
      'delete:own': ['*']
    }
  },
};

export const ac = new AccessControl(grantsObject).lock();
