import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  })

  it('should be able to create a new user only with email and tipo_cadastro', async () => {
    const user = await createUser.execute({
      email: 'johndoe@example.com',
      tipo_cadastro: 'Inscrito',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('tipo_cadastro');
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234',
      tipo_cadastro: 'Cliente',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234',
      tipo_cadastro: 'Cliente',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '1234',
        tipo_cadastro: 'Cliente',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to return user exists with same (email, name, tipo_cadastro) without password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      tipo_cadastro: 'Cliente',
    });

    const userExists = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      tipo_cadastro: 'Cliente',
    });

    expect(userExists.name).toBe('John Doe');
    expect(userExists.email).toBe('johndoe@example.com');
    expect(userExists.tipo_cadastro).toBe('Cliente');
    expect(userExists.password).toBeUndefined();
  });

  it("should not be able to create a new user without 'tipo_cadastro'", async () => {
    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
