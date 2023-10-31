import { Module } from '@nestjs/common';
import { SparkPagesController } from './spark-pages.controller';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { SparkPagesService } from './spark-pages.service';

@Module({
  controllers: [SparkPagesController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: SparkPagesModule,
        schemaOptions: {
          collection: 'SparkPage',
        },
      },
    ]),
  ],
  providers: [SparkPagesService],
})
export class SparkPagesModule {}
