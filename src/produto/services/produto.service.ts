import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';
import { CategoriaService } from 'src/categoria/services/categoria.service';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  // pesquisa por ID
  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });
    // select * from tb_produto where id = 1
    if (!produto) {
      throw new HttpException('produto não encontrada', HttpStatus.NOT_FOUND);
    }

    return produto;
  }

  // pesquisa por Titulo
  async findAllByTitulo(titulo: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }

  // insert into tb_produtos(titulo, texto) values ('titulo que eu mandar', 'texto que eu mandar');
  async create(produto: Produto): Promise<Produto> {
    await this.categoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  // atualizar postagens
  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);

    await this.categoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  // deletar produto
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.produtoRepository.delete(id);
  }
}
