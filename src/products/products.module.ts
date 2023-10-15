import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { ProductModel } from './product.model';

@Module({
  controllers: [ProductsController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductModel,
        schemaOptions: {
          collection: 'Product',
        },
      },
    ]),
  ],
})
export class ProductsModule {}
