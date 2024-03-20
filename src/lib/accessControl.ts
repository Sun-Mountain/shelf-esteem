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
  [Role.ADMIN]: {
    categories: { 'read:any': ['*'], 'create:any': ['*'], 'update:any': ['*'], 'delete:any': ['*'] },
    books: { 'create:any': ['*'], 'update:any': ['*'], 'read:any': ['*'], 'delete:any': ['*'] },
    userLibraryBooks: { 'create:any': ['*'], 'read:any': ['*'], 'delete:any': ['*'] },
    users: { 'read:any': ['*'], 'update:any': ['*'], 'delete:any': ['*'] }
  }
};

export const ac = new AccessControl(grantsObject).lock();
