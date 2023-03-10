import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSettings } from './user-settings.entity';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSettings])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
