import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowAllProjetoService from '@modules/projetos/services/ShowAllProjetoService';

export default class ProjetoController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProjetos = container.resolve(ShowAllProjetoService);

    const projetos = await showProjetos.execute();

    return response.json(projetos);
  }
}
