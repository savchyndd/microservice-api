import { InjectModel } from '@m8a/nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ESparkMainCategory, SparkPagesModel } from './spark-pages.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateSparkPageDto as CreateSparkPageDto } from './dto/create-spark-pages-dto';

@Injectable()
export class SparkPagesService {
  constructor(
    @InjectModel(SparkPagesModel)
    private readonly sparkPagesModel: ModelType<SparkPagesModel>,
  ) {}

  async create(dto: CreateSparkPageDto) {
    return this.sparkPagesModel.create(dto);
  }

  async findById(id: string) {
    return this.sparkPagesModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return this.sparkPagesModel.findOne({ alias }).exec();
  }

  async findByCategory(mainCategory: ESparkMainCategory) {
    return this.sparkPagesModel
      .aggregate()
      .match({ mainCategory })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: { $push: { alias: '$alias', title: '$title' } },
      })
      .exec();
  }
  async findByText(text: string) {
    return this.sparkPagesModel
      .find({ $text: { $search: text, $caseSensitive: false } })
      .exec();
  }

  async updateById(id: string, dto: CreateSparkPageDto) {
    return this.sparkPagesModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  async deleteById(id: string) {
    return this.sparkPagesModel.findByIdAndRemove(id).exec();
  }
}
