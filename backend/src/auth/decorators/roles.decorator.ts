import { SetMetadata } from '@nestjs/common';
import { IS_ROLES_KEY } from 'src/constants/key-decorator';
import { ROLES } from 'src/constants/roles';

export const Roles = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(IS_ROLES_KEY, roles);
