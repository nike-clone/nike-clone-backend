import * as jwt from 'jsonwebtoken';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  login(user: User) {
    const payload = { ...user };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
      audience: process.env.BASE_URL,
      issuer: process.env.BASE_URL,
    });
  }

  verify(jwtString: string) {
    try {
      const payload = jwt.verify(
        jwtString,
        process.env.JWT_SECRET,
      ) as jwt.JwtPayload;

      const { id, email } = payload;

      return {
        userId: id,
        email,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
