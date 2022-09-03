import { PartialType } from '@nestjs/mapped-types';
import { CreateAnonymousCartDto } from './create-anonymous-cart.dto';

export class UpdateAnonymousCartDto extends PartialType(CreateAnonymousCartDto) {}
