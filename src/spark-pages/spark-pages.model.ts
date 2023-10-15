import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum ESparkMainCategory {
  Courses,
  Services,
  Books,
  Products,
}

class VacancyData {
  @prop()
  count: number;

  @prop()
  juniorSalary: number;

  @prop()
  middleSalary: number;

  @prop()
  seniorSalary: number;
}

class AdvantageData {
  @prop()
  title: string;

  @prop()
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface SparkPagesModel extends Base {}
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class SparkPagesModel extends TimeStamps {
  @prop({
    enum: ESparkMainCategory,
  })
  mainCategory: ESparkMainCategory;

  @prop()
  secondCategory: string;

  @prop({ unique: true })
  alias: string;

  @prop()
  title: string;

  @prop()
  category: string;

  @prop({ type: () => [VacancyData] })
  vacancies?: VacancyData;

  @prop({ type: () => [AdvantageData] })
  advantages: AdvantageData;

  @prop()
  seoText: string;

  @prop()
  tagsTitle: string;

  @prop({ type: () => [String] })
  tags: string[];
}
