import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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
    const jwtString = request.headers.authorization.split('Bearer ')[1];
    const userInfo = this.authService.verify(jwtString);

    return userInfo.isAdmin;
  }
}
