import { Role } from '@prisma/client';
import { AccessControl } from 'accesscontrol';

let grantsObject = {
  [Role.USER]: {
    category: { 'read:any': ['*'] },
    book: {
      'create:any': ['*'],
      'read:any': ['*', '!addedBy', '!createdAt', '!udpatedAt']
    },
    userLibraryBook: {
      'create:own': ['*'],
      'read:own': ['*'],
      'delete:own': ['*']
    }
  },
};

export const ac = new AccessControl(grantsObject).lock();
