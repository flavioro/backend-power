import FakeSiteContatoRepository from '../repositories/fakes/FakeSiteContatoRepository';
import CreateSiteContatoService from './CreateSiteContatoService';

let fakeSiteContatoRepository: FakeSiteContatoRepository;
let createSiteContato: CreateSiteContatoService;

describe('CreateSiteContato', () => {
  beforeEach(() => {
    fakeSiteContatoRepository = new FakeSiteContatoRepository();
    createSiteContato = new CreateSiteContatoService(fakeSiteContatoRepository);
  });

  it('should be able to create a new site contato', async () => {
    const siteContato = await createSiteContato.execute({
      pessoa_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
      subject: 'Maria Antonia',
      message: 'Site interessant, very nice and beautiful',
    });

    expect(siteContato).toHaveProperty('id');
  });

  // it('should not be able to create a new site contato without subject', async () => {
  //   await expect(
  //     createSiteContato.execute({
  //       pessoa_id: '6f855f5c-d472-4dff-9bf5-df257e2feda3',
  //       message: 'marai.anotnia@pessoal.com',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
