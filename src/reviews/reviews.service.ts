import { Injectable } from '@nestjs/common';
import { ReviewsModel } from './reviews.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { CreateReviewDto } from './dto/create-review.dto';
import { Types } from 'mongoose';
import { InjectModel } from '@m8a/nestjs-typegoose';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(ReviewsModel)
    private readonly reviewsModel: ModelType<ReviewsModel>,
  ) {}

  async create(dto: CreateReviewDto): Promise<DocumentType<ReviewsModel>> {
    return this.reviewsModel.create(dto);
  }

  async delete(id: string): Promise<DocumentType<ReviewsModel>> | null {
    return this.reviewsModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(
    productId: string,
  ): Promise<DocumentType<ReviewsModel>[]> {
    return this.reviewsModel
      .find({ productId: new Types.ObjectId(productId) })
      .exec();
  }

  async deleteByProductId(productId: string) {
    return this.reviewsModel
      .deleteMany({ productId: new Types.ObjectId(productId) })
      .exec();
  }
}
