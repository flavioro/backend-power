import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import StorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserPictureService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: StorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.picture) {
      await this.storageProvider.deleteFile(user.picture);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.picture = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserPictureService;
