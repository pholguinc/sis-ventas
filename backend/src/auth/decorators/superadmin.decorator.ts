import { SetMetadata } from '@nestjs/common';
import { IS_SUPERADMIN_KEY } from '../../constants/key-decorator';
import { ROLES } from 'src/constants/roles';

export const SuperAdmin = () =>
  SetMetadata(IS_SUPERADMIN_KEY, ROLES.SUPERADMIN);
