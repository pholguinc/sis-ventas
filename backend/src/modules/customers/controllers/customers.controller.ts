import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from '../service/customers.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '../dto/create-customer.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Petición HTTP para crear clientes' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Petición HTTP para listar clientes' })
  async findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Petición HTTP para listar clientes por Id' })
  async findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Petición HTTP para actualizar clientes' })
  async update(@Param('id') id: string, @Body() body: UpdateCustomerDto) {
    return this.customersService.update(body, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Petición HTTP para eliminar clientes' })
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
