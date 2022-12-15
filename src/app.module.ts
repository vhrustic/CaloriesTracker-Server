import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { FoodEntryModule } from './modules/food-entry/food-entry.module';
import { UserModule } from './modules/user/user.module';

import { AppConfigService } from './shared/services/app-config-service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AuthModule, SharedModule, UserModule, FoodEntryModule],
      useFactory: (appConfigService: AppConfigService) =>
        appConfigService.postgresConfig,
      inject: [AppConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
