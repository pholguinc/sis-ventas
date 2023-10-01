import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { User } from '../../modules/users/entities/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({
    summary: 'Petición HTTP para la autentificación del usuario ',
  })
  login(@Req() req: Request) {
    const user = req.user as User;
    if (!user) {
      return 'rrr';
    }
    return this.authService.generateJWT(user);
  }
}
