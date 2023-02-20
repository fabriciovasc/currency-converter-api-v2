import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { UnauthorizedUser } from './errors/unauthorized-user';
import { JwtService } from '@nestjs/jwt';

interface AuthenticateUserRequest {
  username: string;
  password: string;
}

type AuthenticateUserResponse = { accessToken: string };

interface JWTPayload {
  userId: string;
}

@Injectable()
export class AuthenticateUser {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(
    request: AuthenticateUserRequest,
  ): Promise<AuthenticateUserResponse> {
    const user = await this.userRepository.findOne(request.username);

    const valid = await user.validatePassword(request.password);

    if (!valid) {
      throw new UnauthorizedUser();
    }

    const payload: JWTPayload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
