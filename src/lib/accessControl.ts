import { Role } from '@prisma/client';
import { AccessControl } from 'accesscontrol';

let grantsObject = {
  [Role.USER]: {
    categories: { 'read:any': ['*'] },
    books: {
      'create:any': ['*'],
      'update:any': ['libraries'],
      'read:any': ['*', '!addedBy', '!createdAt', '!udpatedAt']
    },
    userLibraryBooks: {
      'create:own': ['*'],
      'read:own': ['*'],
      'delete:own': ['*']
    },
    users: {
      'read:own': ['*'],
      'update:own': ['*'],
      'delete:own': ['*']
    }
  },
};

export const ac = new AccessControl(grantsObject).lock();
