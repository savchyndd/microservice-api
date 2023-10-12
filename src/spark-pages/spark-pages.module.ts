import { Module } from '@nestjs/common';
import { SparkPagesController } from './spark-pages.controller';

@Module({
  controllers: [SparkPagesController]
})
export class SparkPagesModule {}
