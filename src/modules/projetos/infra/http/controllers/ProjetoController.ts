import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProjetoService from '@modules/projetos/services/CreateProjetoService';
import ShowProjetoService from '@modules/projetos/services/ShowProjetoService';

export default class ProjetoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const createProjeto = container.resolve(CreateProjetoService);

    const projeto = await createProjeto.execute({
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

    return response.json(projeto);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { descricao_projeto } = request.body;
    console.log(descricao_projeto);

    const showProjeto = container.resolve(ShowProjetoService);

    const projeto = await showProjeto.execute({ descricao_projeto });

    return response.json(projeto);
  }
}
