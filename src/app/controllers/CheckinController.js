import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const checkin = await Checkin.create({
      student_id,
    });
    // TODO: Criar validação para até 5 checkins a cada 7 dias

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
