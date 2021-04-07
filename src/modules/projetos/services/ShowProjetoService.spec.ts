import AppError from '@shared/errors/AppError';

import FakeProjetosRepository from '../repositories/fakes/FakeProjetosRepository';
import ShowProjetoService from './ShowProjetoService';

let fakeProjetosRepository: FakeProjetosRepository;
let showProjetoService: ShowProjetoService;

describe('ShowProjeto', () => {
  beforeEach(() => {
    fakeProjetosRepository = new FakeProjetosRepository();
    showProjetoService = new ShowProjetoService(fakeProjetosRepository);
  });

  it('should be able show the projeto', async () => {
    const projeto = await fakeProjetosRepository.create({
      nome_projeto: 'Casa New York',
      descricao_projeto: 'Casa New York',
      codigo_projeto: '101',
      tipo_construcao: 'terro',
      categoria: 'terreno 10x30',
      quartos: 2,
      suites: 2,
      garagens: 2,
      area_gourmet: 2,
      piscinas: 2,
      banheiros: 2,
      escritorios: 2,
      salas: 2,
      cozinhas: 2,
      varandas: 2,
      academia: 2,
      sala_tv: 2,
      brinquedoteca: 2,
      lavanderia: 1,
      adega: 2,
      area_construida: 290,
      largura_casa: 19,
      comprimento_casa: 25,
      largura_terreno: 45,
      comprimento_terreno: 30,
      recuo_frontal: 2.8,
      recuo_fundo: 2,
      recuo_esquerdo: 2.5,
      recuo_direito: 2,
    });

    const projetoExist = await showProjetoService.execute({
      descricao_projeto: projeto.descricao_projeto,
    });

    expect(projetoExist.descricao_projeto).toBe('Casa New York');
    expect(projetoExist.ativo).toBe(true);
  });

  it('should not be able show the projeto from non-existing projeto', async () => {
    await expect(
      showProjetoService.execute({
        descricao_projeto: 'non-existing-descricao-projeto',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
