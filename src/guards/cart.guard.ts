import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

declare module 'express' {
  export interface Request {
    user: any;
  }
}

@Injectable()
export class CartGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private async validateRequest(request: Request) {
    if (!request.headers.authorization) {
      if (request.query.anonymous_id) {
        request.user = { id: request.query.anonymous_id };
        return true;
      }

      throw new BadRequestException('Login or set anonymous_id.');
    }
    const jwtString = request.headers.authorization.split('Bearer ')[1];

    try {
      const userInfo = this.authService.verify(jwtString);
      const user = await this.usersService.findUserById(userInfo.userId);
      request.user = user;

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
