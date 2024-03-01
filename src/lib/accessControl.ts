import { Role } from '@prisma/client';
import { AccessControl } from 'accesscontrol';

let grantsObject = {
  [Role.USER]: {
  },
};

export const ac = new AccessControl(grantsObject).lock();
