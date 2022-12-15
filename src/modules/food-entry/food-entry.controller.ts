import {
Body,
Controller,
DefaultValuePipe,
Delete,
Get,
HttpCode,
HttpStatus,
Param,
ParseIntPipe,
Patch,
Post,
Query,
Request,
UseGuards
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Roles } from 'src/utils/roles.decorator';
import { NutritionixSearchResponseDto } from '../auth/dto/nutritionix-search-response.dto';
import { PAGINATION_PAGE_LIMIT } from './../../utils/constants';
import { RolesGuard } from './../auth/auth-roles.guard';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UserService } from './../user/user.service';
import { AddAdminFoodEntryDto } from './dto/add-admin-food-entry.dto';
import { AddFoodEntryDto } from './dto/add-food-entry.dto';
import { AverageCaloriesReportDto } from './dto/average-calories-report.dto';
import { FoodEntryTotalsDto } from './dto/food-entry-totals.dto';
import { FoodEntryDto } from './dto/food-entry.dto';
import { TotalEntriesForWeeksDto } from './dto/total-entries-for-weeks.dto';
import { FoodEntryService } from './food-entry.service';
import { NutritionixService } from './nutritionix.service';

@Controller('food-entry')
@UseGuards(JwtAuthGuard)
export class FoodEntryController {
  constructor(
    private foodEntryService: FoodEntryService,
    private nutritionixService: NutritionixService,
    private userService: UserService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
   getEntries(@Request() req): Promise<FoodEntryDto[]> {
    return this.foodEntryService.getAllByUser(req.user.id);
  }

  @Get('totals')
  @HttpCode(HttpStatus.OK)
   getEntriesTotals(@Request() req): Promise<FoodEntryTotalsDto[]> {
    return this.foodEntryService.getAllWithTotalsByUser(req.user.id);
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
   search(@Query('query') query): Promise<NutritionixSearchResponseDto[]> {
    return this.nutritionixService.searchInstant(query);
  }

  @Post('add')
  @HttpCode(HttpStatus.OK)
   add(
    @Request() req,
    @Body() foodEntry: AddFoodEntryDto,
  ): Promise<FoodEntryDto> {
    return this.foodEntryService.addEntry(foodEntry, req.user.id);
  }

  @Delete('admin/delete/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('admin')
   delete(@Param('id') id: number): Promise<Boolean> {
    return this.foodEntryService.deleteById(id);
  }

  @Get('admin/all')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('admin')
   getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  ): Promise<Pagination<FoodEntryDto>> {
    return this.foodEntryService.getAll({
      page,
      limit: PAGINATION_PAGE_LIMIT,
    });
  }

  @Get('admin/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('admin')
   getById(@Param('id') id: number): Promise<FoodEntryDto> {
    return this.foodEntryService.getById(id);
  }

  @Post('admin/add')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('admin')
  async adminAdd(
    @Body() foodEntry: AddAdminFoodEntryDto,
  ): Promise<FoodEntryDto> {
    const user = await this.userService.findByEmail(foodEntry.email);
    return this.foodEntryService.addEntry(foodEntry, user.id);
  }

  @Patch('admin/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('admin')
  update(
    @Param('id') id: number,
    @Body() addFoodEntryDto: AddFoodEntryDto,
  ): Promise<Boolean> {
    return this.foodEntryService.update(id, addFoodEntryDto);
  }

  @Get('admin/report/total-entries')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('admin')
  async getTotalEntries(): Promise<TotalEntriesForWeeksDto> {
    const [totalInLast7Res, totalTwoWeeksBeforeRes] = await Promise.all([
      this.foodEntryService.getTotalEntriesInLast7Days(),
      this.foodEntryService.getTotalEntriesTwoWeeksAgo(),
    ]);

    return {
      last7Days: totalInLast7Res[0].totalEntries,
      twoWeeksBefore: totalTwoWeeksBeforeRes[0].totalEntries,
    };
  }

  @Get('admin/report/average-calories')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('admin')
  getAverageCalories(): Promise<AverageCaloriesReportDto> {
    return this.foodEntryService.getAverageCaloriesPerUser();
  }
}
