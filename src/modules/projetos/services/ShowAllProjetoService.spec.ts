import AppError from '@shared/errors/AppError';

import FakeProjetosRepository from '../repositories/fakes/FakeProjetosRepository';
import ShowAllProjetosService from './ShowAllProjetoService';

let fakeProjetosRepository: FakeProjetosRepository;
let showAllProjetosService: ShowAllProjetosService;

describe('ShowProjeto', () => {
  beforeEach(() => {
    fakeProjetosRepository = new FakeProjetosRepository();
    showAllProjetosService = new ShowAllProjetosService(fakeProjetosRepository);
  });

  it('should be able to list from projetos', async () => {
    await fakeProjetosRepository.create({
      nome_projeto: 'Casa New York',
      descricao_projeto: 'Casa New York',
      codigo_projeto: '101',
      tipo_construcao: 'terreo',
      categoria: 'all, 10x30',
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

    await fakeProjetosRepository.create({
      nome_projeto: 'Casa Monaco',
      descricao_projeto: 'Casa Monaco',
      codigo_projeto: '101',
      tipo_construcao: 'terreo',
      categoria: 'all, 10x30',
      quartos: 3,
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

    const projetosAvailability = await showAllProjetosService.execute();

    expect(projetosAvailability[0].descricao_projeto).toBe('Casa New York');
    expect(projetosAvailability[1].descricao_projeto).toBe('Casa Monaco');
  });

  it('should not be able show list the projeto from non-existing projeto', async () => {
    await expect((await showAllProjetosService.execute()).length).toBe(0);
    await expect((await showAllProjetosService.execute()).length).toBeUndefined;
  });
});
