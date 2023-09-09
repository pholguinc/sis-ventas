import { SetMetadata } from '@nestjs/common';
import { IS_ADMIN_KEY } from 'src/constants/key-decorator';
import { ROLES } from 'src/constants/roles';

export const Admin = () => SetMetadata(IS_ADMIN_KEY, ROLES.ADMIN);
