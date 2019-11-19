import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const student = await Student.findOne({ where: { email: req.body.email } });
    if (student) {
      res.status(401).json({ message: 'Student already exists' });
    }

    const { email, name, age, height, weight } = await Student.create(req.body);

    res.json({
      email,
      name,
      age,
      height,
      weight,
    });
  }

  async index(req, res) {
    const { page = 1, search = '' } = req.query;
    const students = await Student.findAll({
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
    res.json(students);
  }

  async show(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      res.status(400).json({ message: 'Student does not exists' });
    }
    res.json(student);
  }

  async update(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      res.status(400).json({ message: 'Student does not exists' });
    }
    await student.update(req.body);
    res.json(student);
  }

  async delete(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      res.status(400).json({ message: 'Student does not exists' });
    }
    await student.destroy(id);
    return res.send();
  }
}

export default new StudentController();
