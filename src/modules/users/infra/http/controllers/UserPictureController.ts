import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserPictureService from '@modules/users/services/UpdateUserPictureService';

export default class UserPictureController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserPicture = container.resolve(UpdateUserPictureService);

    const user = await updateUserPicture.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}
