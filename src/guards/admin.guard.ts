import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateAdmin(request);
  }

  private validateAdmin(request: Request) {
    const token = request.headers.authorization;
    if (!token) {
      throw new BadRequestException('token error.');
    }
    const jwtString = token.split('Bearer ');
    if (!token) {
      throw new BadRequestException('token error.');
    }
    const jwt = jwtString[1];

    const userInfo = this.authService.verify(jwt);

    return userInfo.isAdmin;
  }
}
