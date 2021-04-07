import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name?: string;
  email: string;
  password?: string;
  tipo_cadastro?: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    tipo_cadastro,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (
      checkUserExists &&
      checkUserExists.name === name &&
      checkUserExists.tipo_cadastro === tipo_cadastro &&
      typeof password === 'undefined'
    ) {
      return checkUserExists;
    }

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    let user = new User();

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    if (!tipo_cadastro) {
      throw new AppError(
        'Inform type of registration (Funcionário, Cliente, Inscrito).',
      );
    } else {
      user.tipo_cadastro = tipo_cadastro;
    }

    const userCreate = this.usersRepository.create({
      name,
      email,
      password: user.password,
      tipo_cadastro: user.tipo_cadastro,
    });

    return userCreate;
  }
}

export default CreateUserService;
