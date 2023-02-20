import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JWTPayloadRequest } from '../../../application/strategies/jwt-strategy';

const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Partial<JWTPayloadRequest> => {
    try {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    } catch (error) {
      throw new ForbiddenException();
    }
  },
);

export default Auth;
