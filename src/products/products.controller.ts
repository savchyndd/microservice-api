import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Body,
  HttpCode,
  NotFoundException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product-dto';
import { CreateProductDto } from './dto/create-product-dto';
import { ProductsService } from './products.service';
import {
  PRODUCT_NOT_FOUND_ERROR,
  PRODUCT_SECCESSFULLY_DELETED,
} from './product.constants';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const product = await this.productService.findProductById(id);

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedProduct = await this.productService.deleteProductById(id);

    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return { message: PRODUCT_SECCESSFULLY_DELETED };
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {
    const updatedProduct = await this.productService.updateProductById(id, dto);

    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return updatedProduct;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return this.productService.findProductWithReviews(dto);
  }
}
