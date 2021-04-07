import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Projetos from '../infra/typeorm/entities/Projetos';
import IProjetosRepository from '../repositories/IProjetosRepository';

interface IRequest {
  nome_projeto: string;
  codigo_projeto: string;
  descricao_projeto: string;
  tipo_construcao: string;
  categoria: string;
  quartos: number;
  suites: number;
  garagens: number;
  area_gourmet: number;
  piscinas: number;
  banheiros: number;
  escritorios: number;
  salas: number;
  cozinhas: number;
  varandas: number;
  academia: number;
  sala_tv: number;
  brinquedoteca: number;
  lavanderia: number;
  adega: number;
  area_construida: number;
  largura_casa: number;
  comprimento_casa: number;
  largura_terreno: number;
  comprimento_terreno: number;
  recuo_frontal: number;
  recuo_fundo: number;
  recuo_esquerdo: number;
  recuo_direito: number;
}

@injectable()
class CreateProjetoService {
  constructor(
    @inject('ProjetosRepository')
    private projetosRepository: IProjetosRepository,
  ) {}

  public async execute({
    nome_projeto,
    codigo_projeto,
    descricao_projeto,
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
  }: IRequest): Promise<Projetos> {
    const checkProjetoExists = await this.projetosRepository.findByName(
      descricao_projeto,
    );

    if (checkProjetoExists) {
      throw new AppError('Name projeto already used.');
    }

    const projetoCreate = this.projetosRepository.create({
      nome_projeto,
      codigo_projeto,
      descricao_projeto,
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

    return projetoCreate;
  }
}

export default CreateProjetoService;
