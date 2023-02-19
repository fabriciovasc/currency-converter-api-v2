import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import validationConfig from './config/validation-config';
import appConfig from './config/app-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: validationConfig,
      load: [appConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
