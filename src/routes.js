import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.post('/users', async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.create({
    name,
    password_hash: password,
    email,
  });

  res.json(user);
});

export default routes;
