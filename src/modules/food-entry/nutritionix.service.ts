import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { NutritionixSearchResponseDto } from '../auth/dto/nutritionix-search-response.dto';
import { AppConfigService } from './../../shared/services/app-config-service';

@Injectable()
export class NutritionixService {
  constructor(
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async searchInstant(query: string): Promise<any> {
    const url = `${this.appConfigService.nutritionixConfig.baseUrl}/v2/search/instant?query=${query}`;
    const headers = {
      'x-app-id': this.appConfigService.nutritionixConfig.appId,
      'x-app-key': this.appConfigService.nutritionixConfig.appKey,
    };

    const { data } = await firstValueFrom(
      this.httpService.get(url, { headers }),
    );

    return data.branded.map(
      (item) =>
        new NutritionixSearchResponseDto(item.food_name, item.nf_calories),
    );
  }
}
