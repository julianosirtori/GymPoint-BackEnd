import HelpOrder from '../models/HelpOrder';

class AnswerHelpOrderController {
  async store(req, res) {
    const { answer } = req.body;
    const helpOrder = await HelpOrder.update(
      { answer, answer_at: new Date() },
      { returning: true, where: { id: req.params.id } }
    );
    return res.json(helpOrder);
  }

  async index(req, res) {
    const helporders = await HelpOrder.findAll();
    return res.json(helporders);
  }
}

export default new AnswerHelpOrderController();
