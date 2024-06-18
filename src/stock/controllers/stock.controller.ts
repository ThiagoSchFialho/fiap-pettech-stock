import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { StockService } from '../service/stock.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { LogginInterceptor } from 'src/shared/interceptors/loggin.interceptor';

const createStockSchema = z.object({
  name: z.string(),
  quantity: z.coerce.number(),
  relationId: z.string(),
});

const updateStockSchema = z.object({
  stock: z.coerce.number(),
});

type CreateStock = z.infer<typeof createStockSchema>;
type UpdateStock = z.infer<typeof updateStockSchema>;

@UseInterceptors(LogginInterceptor)
@Controller('stock') // <- Essa string é a url
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @UseGuards(AuthGuard) // Essa página/url só pode ser acessada se o usuário estiver autorizado
  @Get()
  async getAllStock(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.stockService.getAllStock(limit, page);
  }

  @Get(':productId')
  async getStock(@Param('productId') productId: string) {
    return this.stockService.getStock(productId);
  }

  @UsePipes(new ZodValidationPipe(createStockSchema))
  @Post()
  async createStock(@Body() { name, quantity, relationId }: CreateStock) {
    return this.stockService.createStock({ name, quantity, relationId });
  }

  @Put(':productId')
  async updateStock(
    @Param('productId') productId: string,
    @Body(new ZodValidationPipe(updateStockSchema)) { stock }: UpdateStock,
  ) {
    return this.stockService.updateStock(productId, stock);
  }

  @Delete(':productId')
  async deleteStock(@Param('productId') productId: string) {
    return this.stockService.deleteStock(productId);
  }
}
