import * as jwt from 'jsonwebtoken';

import { Injectable } from '@nestjs/common';

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
}
