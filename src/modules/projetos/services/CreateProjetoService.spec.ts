import AppError from '@shared/errors/AppError';

import FakeProjetosRepository from '../repositories/fakes/FakeProjetosRepository';
import CreateProjetoService from './CreateProjetoService';

let fakeProjetosRepository: FakeProjetosRepository;
let createProjeto: CreateProjetoService;

describe('CreateProjeto', () => {
  beforeEach(() => {
    fakeProjetosRepository = new FakeProjetosRepository();
    createProjeto = new CreateProjetoService(fakeProjetosRepository);
  });

  it('should be able to create a new projeto', async () => {
    const projeto = await createProjeto.execute({
      nome_projeto: 'Casa New York',
      codigo_projeto: '101',
      descricao_projeto:
        'Este projeto é para você que procura um maravilhoso ambiente integrado sem divisões com pequenas portas. Hall de entrada, cozinha, sala de estar, salada de jantar, área gourmet, cozinha gourmet com churrasqueira e piscina completamente integrados, você que sonha com uma casa linda e espaçosa, acaba de encontrar. Os ambientes são integrados porem bem delimitados, projetados para atender a dinâmica de toda uma família. Os quartos trazem conforto e privacidade onde dois deles são no térreo e a suíte master no andar superior proporcionando ao casal, privacidade e isolamento quando necessário. A varanda gourmet possui uma sala integrada que proporciona liberdade em dias de visitas e uma ótima integração com a cozinha gourmet, não esquecendo da grande privacidade que traz a todo o restante da casa podendo ser completamente isolada em dias de festa.',
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
      largura_casa: 19.5,
      comprimento_casa: 25,
      largura_terreno: 45,
      comprimento_terreno: 30,
      recuo_frontal: 2,
      recuo_fundo: 2,
      recuo_esquerdo: 2,
      recuo_direito: 2,
    });

    expect(projeto).toHaveProperty('id');
    expect(projeto.descricao_projeto).toBe(
      'Este projeto é para você que procura um maravilhoso ambiente integrado sem divisões com pequenas portas. Hall de entrada, cozinha, sala de estar, salada de jantar, área gourmet, cozinha gourmet com churrasqueira e piscina completamente integrados, você que sonha com uma casa linda e espaçosa, acaba de encontrar. Os ambientes são integrados porem bem delimitados, projetados para atender a dinâmica de toda uma família. Os quartos trazem conforto e privacidade onde dois deles são no térreo e a suíte master no andar superior proporcionando ao casal, privacidade e isolamento quando necessário. A varanda gourmet possui uma sala integrada que proporciona liberdade em dias de visitas e uma ótima integração com a cozinha gourmet, não esquecendo da grande privacidade que traz a todo o restante da casa podendo ser completamente isolada em dias de festa.',
    );
  });

  it('should not be able to create a new projeto with same name from another', async () => {
    await createProjeto.execute({
      nome_projeto: 'Casa New York',
      codigo_projeto: '101',
      descricao_projeto: 'Casa New York',
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
      largura_casa: 19.5,
      comprimento_casa: 25,
      largura_terreno: 45,
      comprimento_terreno: 30,
      recuo_frontal: 2,
      recuo_fundo: 2,
      recuo_esquerdo: 2,
      recuo_direito: 2,
    });

    await expect(
      createProjeto.execute({
        nome_projeto: 'Casa New York',
        codigo_projeto: '101',
        descricao_projeto: 'Casa New York',
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
        largura_casa: 19.5,
        comprimento_casa: 25,
        largura_terreno: 45,
        comprimento_terreno: 30,
        recuo_frontal: 2,
        recuo_fundo: 2,
        recuo_esquerdo: 2,
        recuo_direito: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
