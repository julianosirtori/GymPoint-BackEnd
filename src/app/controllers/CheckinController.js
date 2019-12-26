import { Op } from 'sequelize';
import { subDays } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const countCheckins = await Checkin.count({
      where: {
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });
    if (countCheckins >= 5) {
      return res.status(400).json({
        error:
          "Don't accepted . It is accepted only five checkings each seven days.",
      });
    }
    const checkin = await Checkin.create({
      student_id,
    });

    return res.json(checkin);
  }

  async index(req, res) {
    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const checkins = await Checkin.findAll({
      where: { student_id },
      order: [['id', 'DESC']],
    });
    return res.json(checkins);
  }
}

export default new CheckinController();
