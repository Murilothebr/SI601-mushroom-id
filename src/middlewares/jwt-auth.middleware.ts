import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
      throw new UnauthorizedException('Missing Authorization header');

    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Missing token');

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
      req['user'] = payload;
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
