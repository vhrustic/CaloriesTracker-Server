import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './../user/user.module';
import { FoodEntryController } from './food-entry.controller';
import { FoodEntry } from './food-entry.entity';
import { FoodEntryService } from './food-entry.service';
import { NutritionixService } from './nutritionix.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntry]), HttpModule, UserModule],
  controllers: [FoodEntryController],
  exports: [],
  providers: [FoodEntryService, NutritionixService],
})
export class FoodEntryModule {}
