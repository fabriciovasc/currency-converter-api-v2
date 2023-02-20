import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUser } from '../../../application/use-cases/authenticate-user';
import { LoginBody } from '../dtos/login-body';

@Controller('login')
export class LoginController {
  constructor(private authenticateUser: AuthenticateUser) {}

  @Post()
  async authenticate(@Body() body: LoginBody) {
    const { username, password } = body;

    return this.authenticateUser.execute({ username, password });
  }
}
