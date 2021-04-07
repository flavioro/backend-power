import ProjetoRepositorio from '@modules/projetos/infra/typeorm/repositories/ProjetosRepository';
// import Projetos from '../entities/Projetos';

class InsertProjetos {
  private projetoRepositorio: ProjetoRepositorio;

  constructor() {
    this.projetoRepositorio = new ProjetoRepositorio();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async insert() {
    const projeto = await this.projetoRepositorio.create({
      nome_projeto: 'Casa New York',
      codigo_projeto: '101',
      descricao_projeto: 'Casa New York',
      tipo_construcao: 'terreo',
      categoria: 'all,15x30,15x35,15x40',
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

    return true;
  }
}

export default InsertProjetos;
