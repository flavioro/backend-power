import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserPictureController from '../controllers/UserPictureController';

const usersRouter = Router();
const usersController = new UsersController();
const userPictureController = new UserPictureController();
const upload = multer(uploadConfig);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      tipo_cadastro: Joi.string(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/picture',
  ensureAuthenticated,
  upload.single('picture'),
  userPictureController.update,
);

export default usersRouter;
