import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import validationConfig from './config/validation-config';
import appConfig from './config/app-config';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: validationConfig,
      load: [appConfig],
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
