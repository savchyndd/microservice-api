export enum ESparkMainCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class SparkPagesModel {
  _id: string;
  mainCategory: ESparkMainCategory;
  secondCategory: string;
  title: string;
  category: string;
  vacancies?: {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
  };
  advantages: {
    title: string;
    description: string;
  };
  seoText: string;
  tagsTitle: string;
  tags: string[];
}
