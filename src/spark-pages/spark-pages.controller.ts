import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindSparkPageDto } from './dto/find-spark-pages-dto';
import { SparkPagesService } from './spark-pages.service';
import { CreateSparkPageDto } from './dto/create-spark-pages-dto';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { NOT_FOUND_SPARK_PAGE_ERROR } from './spark-pages.constats';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('spark-pages')
export class SparkPagesController {
  constructor(private readonly sparkPagesService: SparkPagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateSparkPageDto) {
    return this.sparkPagesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getByProduct(@Param('id', IdValidationPipe) id: string) {
    const page = await this.sparkPagesService.findById(id);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_SPARK_PAGE_ERROR);
    }

    return page;
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const page = await this.sparkPagesService.findByAlias(alias);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_SPARK_PAGE_ERROR);
    }

    return page;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedPage = await this.sparkPagesService.deleteById(id);

    if (!deletedPage) {
      throw new NotFoundException(NOT_FOUND_SPARK_PAGE_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: CreateSparkPageDto) {
    const page = await this.sparkPagesService.updateById(id, dto);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_SPARK_PAGE_ERROR);
    }

    return page;
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('find')
  async find(@Body() dto: FindSparkPageDto) {
    return this.sparkPagesService.findByCategory(dto.mainCategory);
  }

  @Get('textSearch')
  async textSearch(@Param('text') text: string) {
    return this.sparkPagesService.findByText(text);
  }
}
