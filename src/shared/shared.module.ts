import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './services/app-config-service';

const providers = [AppConfigService];

@Global()
@Module({
  providers,
  imports: [ConfigModule.forRoot()],
  exports: [...providers],
})
export class SharedModule {}
