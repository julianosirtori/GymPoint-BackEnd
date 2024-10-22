import { Op } from 'sequelize';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const { page = 1, search = '' } = req.query;
    const users = await User.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      limit: 20,
      offset: (page - 1) * 20,
      order: ['name'],
    });
    res.json(users);
  }

  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'User  already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, email, provider });
  }
}

export default new UserController();
