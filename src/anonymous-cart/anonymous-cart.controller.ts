import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnonymousCartService } from './anonymous-cart.service';
import { CreateAnonymousCartDto } from './dto/create-anonymous-cart.dto';
import { UpdateAnonymousCartDto } from './dto/update-anonymous-cart.dto';

@Controller('anonymous-cart')
export class AnonymousCartController {
  constructor(private readonly anonymousCartService: AnonymousCartService) {}

  @Post()
  create(@Body() createAnonymousCartDto: CreateAnonymousCartDto) {
    return this.anonymousCartService.create(createAnonymousCartDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anonymousCartService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnonymousCartDto: UpdateAnonymousCartDto,
  ) {
    return this.anonymousCartService.update(+id, updateAnonymousCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anonymousCartService.remove(+id);
  }
}
