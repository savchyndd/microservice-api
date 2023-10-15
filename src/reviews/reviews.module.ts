import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { ReviewsService } from './reviews.service';

@Module({
  controllers: [ReviewsController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewsModule,
        schemaOptions: {
          collection: 'Reviews',
        },
      },
    ]),
  ],
  providers: [ReviewsService],
})
export class ReviewsModule {}
