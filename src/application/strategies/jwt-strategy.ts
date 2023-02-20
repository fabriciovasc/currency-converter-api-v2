import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../repositories/user-repository';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user';
import { UnauthorizedUser } from '../use-cases/errors/unauthorized-user';
import { AuthStrategy } from './auth-strategy';

export interface JWTPayloadRequest {
  userId: string;
}

type JWTValidateResponse = User;

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy)
  implements AuthStrategy<JWTPayloadRequest>
{
  constructor(
    private configService: ConfigService,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtSecret'),
    });
  }

  async validate(request: JWTPayloadRequest): Promise<JWTValidateResponse> {
    const user = await this.userRepository.findById(request.userId);
    if (!user) {
      throw new UnauthorizedUser();
    }

    return user;
  }
}
