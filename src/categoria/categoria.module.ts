import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { CategoriaService } from './services/categoria.service';
import { CategoriaController } from './controllers/categoria.controller';

@Module({
  // importação da modelagem de Categoria
  imports: [TypeOrmModule.forFeature([Categoria])],
  // asd
  providers: [CategoriaService],
  controllers: [CategoriaController],
  exports: [CategoriaService],
})
export class CategoriaModule {}
