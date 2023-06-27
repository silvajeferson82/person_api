import { Router } from 'express';
import { usersRoutes } from './routes/users/users.routes';

const api = Router().use(usersRoutes);

export default Router().use('/api', api);