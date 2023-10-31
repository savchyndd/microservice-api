import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ESparkMainCategory } from '../spark-pages.model';
import { Type } from 'class-transformer';

class VacancyData {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;
}

class AdvantageData {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateSparkPageDto {
  @IsEnum(ESparkMainCategory)
  mainCategory: ESparkMainCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => VacancyData)
  vacancies?: VacancyData;

  @ValidateNested()
  @Type(() => AdvantageData)
  @IsArray()
  advantages: AdvantageData[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
