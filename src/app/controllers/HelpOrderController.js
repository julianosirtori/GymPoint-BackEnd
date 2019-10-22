import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async store(req, res) {
    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Field question not found' });
    }
    const { id } = await HelpOrder.create({
      question,
      student_id,
    });
    return res.json({ id, question, student_id });
  }

  async index(req, res) {
    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const helpOrders = await HelpOrder.findAll({
      where: { student_id },
    });
    return res.json(helpOrders);
  }
}

export default new HelpOrderController();
