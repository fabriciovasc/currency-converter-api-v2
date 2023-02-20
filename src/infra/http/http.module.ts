import { Module } from '@nestjs/common';
import { AuthenticateUser } from '../../application/use-cases/authenticate-user';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../../application/strategies/jwt-strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  controllers: [],
  providers: [AuthenticateUser, JwtStrategy],
})
export class HttpModule {}
