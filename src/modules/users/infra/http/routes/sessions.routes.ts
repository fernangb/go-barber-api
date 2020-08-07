import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';


const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const usersRepository = new UsersRepository();

  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const responseUser = {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json({ user: responseUser, token });
});

export default sessionsRouter;
