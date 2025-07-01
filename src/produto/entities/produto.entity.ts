import { IsNotEmpty } from 'class-validator';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  titulo: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  descricao: string;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
  preco: number;

  @ManyToOne(() => Categoria, (Categoria) => Categoria.produto, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;
}
