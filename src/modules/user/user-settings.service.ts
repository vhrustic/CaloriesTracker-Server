import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { FindOptionsWhere, Repository } from 'typeorm';
import { UserSettings } from './user-settings.entity';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSettings)
    private readonly userSettingsRepository: Repository<UserSettings>,
  ) {}

  find(findData: FindOptionsWhere<UserSettings>): Promise<UserSettings | null> {
    return this.userSettingsRepository.findOneBy(findData);
  }
}
