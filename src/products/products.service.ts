import { InjectModel } from '@m8a/nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ProductModel } from './product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateProductDto } from './dto/create-product-dto';
import { FindProductDto } from './dto/find-product-dto';
import { ReviewsModel } from 'src/reviews/reviews.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: ModelType<ProductModel>,
  ) {}

  async createProduct(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  async findProductById(id: string) {
    return this.productModel.findById(id).exec();
  }

  async deleteProductById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateProductById(id: string, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findProductWithReviews(dto: FindProductDto) {
    return (await this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        { $sort: { _id: 1 } },
        { $limit: dto.limit },
        {
          $lookup: {
            from: 'Reviews',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
            reviews: {
              $function: {
                body: `function (reviews) {
                  reviews.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                  );
                  return reviews;
                }`,
                args: ['$reviews'],
                lang: 'js',
              },
            },
          },
        },
      ])
      .exec()) as (ProductModel & {
      review: ReviewsModel[];
      reviewCount: number;
      reviewAvg: number;
    })[];
  }
}
