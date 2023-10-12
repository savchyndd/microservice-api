import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SparkPagesModel } from './spark-pages.model';
import { FindSparkPageDto } from './dto/find-spark-pages-dto';

@Controller('spark-pages')
export class SparkPagesController {
  @Post('create')
  async create(@Body() dto: Omit<SparkPagesModel, '_id'>) {}

  @Get(':id')
  async getByProduct(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: SparkPagesModel) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindSparkPageDto) {}
}
