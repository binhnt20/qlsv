import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-custom';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'auth') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async validate(request: Request) {
    try {
      const token = request.headers['authorization'];
      if (!token) return false;
      if (token === process.env.INTERNAL_JWT_KEY) return true;
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_ACCESS_SECRET });
      if (!payload) return false;
      if (['GET', 'DELETE'].includes(request.method)) request.query.userId = payload.userId;
      else request.body.userId = payload.userId;
      return payload;
    } catch (error) {
      console.log(error.message);
      return { state: 0, msg: error.message };
    }
  }
}
