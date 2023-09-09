import { ROLES } from 'src/constants/roles';

export interface PayloadToken {
  role: ROLES;
  sub: string;
}
