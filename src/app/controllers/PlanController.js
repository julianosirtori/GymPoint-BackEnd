import * as yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = yup.object().shape({
      title: yup.string().required(),
      duration: yup.number().required(),
      price: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, duration, price } = req.body;

    const { id } = await Plan.create({
      title,
      duration,
      price,
    });

    return res.json({ id, title, duration, price });
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    res.json(plans);
  }

  async show(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id, {
      attributes: ['id', 'title', 'duration', 'price'],
    });
    if (!plan) {
      res.status(400).json({ error: 'Plan not found' });
    }
    res.json(plan);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      title: yup.string().required(),
      duration: yup.number().required(),
      price: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    if (!plan) {
      res.status(400).json({ error: 'Plan not found' });
    }

    const { title, duration, price } = req.body;

    await plan.update({
      title,
      duration,
      price,
    });

    return res.json({ id, title, duration, price });
  }

  async delete(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    if (!plan) {
      res.status(400).json({ error: 'Plan not found' });
    }
    await plan.destroy();
    return res.json();
  }
}

export default new PlanController();
