import { getRepository, Repository } from 'typeorm';

import IProjetosRepository from '@modules/projetos/repositories/IProjetosRepository';
import ICreateProjetoDTO from '@modules/projetos/dtos/ICreateProjetoDTO';

import Projetos from '../entities/Projetos';

class ProjetosRepository implements IProjetosRepository {
  private ormRepository: Repository<Projetos>;

  constructor() {
    this.ormRepository = getRepository(Projetos);
  }

  public async findByName(
    descricao_projeto: string,
  ): Promise<Projetos | undefined> {
    const projeto = await this.ormRepository.findOne({
      where: { descricao_projeto },
    });

    return projeto;
  }

  public async findById(id: string): Promise<Projetos | undefined> {
    const projeto = await this.ormRepository.findOne(id);

    return projeto;
  }

  public async findAll(): Promise<Projetos[] | undefined> {
    const projetos = await this.ormRepository.find({
      relations: ['produtos', 'videos'],
    });

    return projetos;
  }

  public async create({
    nome_projeto,
    descricao_projeto,
    codigo_projeto,
    tipo_construcao,
    categoria,
    quartos,
    suites,
    garagens,
    area_gourmet,
    piscinas,
    banheiros,
    escritorios,
    salas,
    cozinhas,
    varandas,
    academia,
    sala_tv,
    brinquedoteca,
    lavanderia,
    adega,
    area_construida,
    largura_casa,
    comprimento_casa,
    largura_terreno,
    comprimento_terreno,
    recuo_frontal,
    recuo_fundo,
    recuo_esquerdo,
    recuo_direito,
  }: ICreateProjetoDTO): Promise<Projetos> {
    const projeto = this.ormRepository.create({
      nome_projeto,
      descricao_projeto,
      codigo_projeto,
      tipo_construcao,
      categoria,
      quartos,
      suites,
      garagens,
      area_gourmet,
      piscinas,
      banheiros,
      escritorios,
      salas,
      cozinhas,
      varandas,
      academia,
      sala_tv,
      brinquedoteca,
      lavanderia,
      adega,
      area_construida,
      largura_casa,
      comprimento_casa,
      largura_terreno,
      comprimento_terreno,
      recuo_frontal,
      recuo_fundo,
      recuo_esquerdo,
      recuo_direito,
    });

    await this.ormRepository.save(projeto);

    return projeto;
  }

  public async save(projeto: Projetos): Promise<Projetos> {
    return this.ormRepository.save(projeto);
  }
}

export default ProjetosRepository;
