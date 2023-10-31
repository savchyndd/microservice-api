import { IsEnum } from 'class-validator';
import { ESparkMainCategory } from '../spark-pages.model';

export class FindSparkPageDto {
  @IsEnum(ESparkMainCategory)
  mainCategory: ESparkMainCategory;
}
