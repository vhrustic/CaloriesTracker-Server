import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
IPaginationOptions,
paginate,
Pagination
} from 'nestjs-typeorm-paginate';
import type { Repository } from 'typeorm';
import {
getAverageNumberOfCaloriesPerUser,
getFoodEntriesWithDayTotals,
getNumberOfEntriesInLast7Days,
getNumberOfEntriesTwoWeeksAgo
} from './../../utils/sql-queries';
import { AddFoodEntryDto } from './dto/add-food-entry.dto';
import { AverageCaloriesReportDto } from './dto/average-calories-report.dto';
import { FoodEntryTotalsDto } from './dto/food-entry-totals.dto';
import { FoodEntryDto } from './dto/food-entry.dto';
import { TotalEntriesReportDto } from './dto/total-entries-report.dto';
import { FoodEntry } from './food-entry.entity';

@Injectable()
export class FoodEntryService {
  constructor(
    @InjectRepository(FoodEntry)
    private readonly foodEntryRepository: Repository<FoodEntry>,
  ) {}

  getAllByUser(userId: number): Promise<FoodEntryDto[] | null> {
    return this.foodEntryRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  getAllWithTotalsByUser(userId: number): Promise<FoodEntryTotalsDto[]> {
    return this.foodEntryRepository.query(getFoodEntriesWithDayTotals, [
      userId,
    ]);
  }

  async addEntry(
    foodEntryDto: AddFoodEntryDto,
    userId: number,
  ): Promise<FoodEntryDto | null> {
    const foodEntry = await this.foodEntryRepository.save({
      ...foodEntryDto,
      user: { id: userId },
    });

    return new FoodEntryDto(foodEntry);
  }

  getAll(options: IPaginationOptions): Promise<Pagination<FoodEntryDto>> {
    const queryBuilder = this.foodEntryRepository
      .createQueryBuilder('fe')
      .leftJoinAndSelect('fe.user', 'user');
    queryBuilder.orderBy('fe.createdAt', 'DESC');

    return paginate<FoodEntry>(queryBuilder, options);
  }

  async getById(entryId: number): Promise<FoodEntryDto> {
    const foodEntry = await this.foodEntryRepository.findOneBy({ id: entryId });
    return new FoodEntryDto(foodEntry);
  }

  async deleteById(entryId: number): Promise<Boolean> {
    const result = await this.foodEntryRepository.softDelete(entryId);
    return result.affected > 0;
  }

  async update(
    entryId: number,
    addFoodEntryDto: AddFoodEntryDto,
  ): Promise<Boolean> {
    const result = await this.foodEntryRepository.update(
      { id: entryId },
      addFoodEntryDto,
    );
    return result.affected > 0;
  }

  getTotalEntriesInLast7Days(): Promise<TotalEntriesReportDto[]> {
    return this.foodEntryRepository.query(getNumberOfEntriesInLast7Days);
  }

  getTotalEntriesTwoWeeksAgo(): Promise<TotalEntriesReportDto[]> {
    return this.foodEntryRepository.query(getNumberOfEntriesTwoWeeksAgo);
  }

  getAverageCaloriesPerUser(): Promise<AverageCaloriesReportDto> {
    return this.foodEntryRepository.query(getAverageNumberOfCaloriesPerUser);
  }
}
