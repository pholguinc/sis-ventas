import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { SuperAdmin } from 'src/auth/decorators/superadmin.decorator';
import { Admin } from 'src/auth/decorators/admin.decorator';
//import { Public } from '../../../auth/decorators/public.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Petición HTTP para crear usuarios' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //@Public() #Define si el endpoint es pública
  @SuperAdmin()
  @Get()
  @ApiOperation({ summary: 'Petición HTTP para listar usuarios' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Petición HTTP para listar usuarios por Id' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  
  @Put(':id')
  @ApiOperation({ summary: 'Petición HTTP para actualizar usuarios' })
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(body, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Petición HTTP para eliminar usuarios' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
