import { Router } from 'express';
import { adaptRoute } from '../../core/infra/adapters/ExpressRouteAdapters'; 

import {
  makeCreateUsersController,
  makeGetUsersController,
  makeGetUserByIdController,
  makeUpdateUserController,
  makeDeleteUserController
} from '../../core/http/controllers/users/users.controllers';


const usersRoutes = Router();

usersRoutes.post('/user', adaptRoute(makeCreateUsersController()));
usersRoutes.get('/users', adaptRoute(makeGetUsersController()));
usersRoutes.get('/user/:id', adaptRoute(makeGetUserByIdController()));
usersRoutes.put('/user/:id', adaptRoute(makeUpdateUserController()));
usersRoutes.delete('/user/:id', adaptRoute(makeDeleteUserController()));

export { usersRoutes };