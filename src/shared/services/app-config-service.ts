import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get postgresConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      database: this.configService.get<string>('DATABASE_NAME'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      schema: this.configService.get<string>('DATABASE_SCHEMA'),
      migrations: ['src/migrations/*.{ts,js}'],
      entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      logger: 'file',
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: false,
    };
  }

  get authConfig() {
    return {
      tokenExpirationTime: this.configService.get<number>(
        'JWT_EXPIRATION_TIME',
      ),
      secretKey: this.configService.get<string>('JWT_SECRET_KEY'),
    };
  }

  get nutritionixConfig() {
    return {
      appId: this.configService.get<string>('NUTRITIONIX_APP_ID'),
      appKey: this.configService.get<string>('NUTRITIONIX_APP_KEY'),
      baseUrl: this.configService.get<string>('NUTRITIONIX_BASE_URL'),
    };
  }
}
