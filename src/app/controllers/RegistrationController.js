import * as yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async store(req, res) {
    const schema = yup.object().shape({
      plan_id: yup.number().required(),
      start_date: yup.date().required(),
      student_id: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { plan_id, start_date, student_id } = req.body;

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }
    // TODO: Verefy if student already has a plan

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date: addMonths(parseISO(start_date), plan.duration),
      price: plan.duration * plan.price,
    });

    await Queue.add(RegistrationMail.key, {
      plan,
      student,
      registration,
    });

    const { id, end_date, price } = registration;

    return res.json({ id, student_id, plan_id, start_date, end_date, price });
  }

  async index(req, res) {
    const { page } = req.query;
    const registrations = await Registration.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'start_date', 'end_date'],
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(registrations);
  }

  async show(req, res) {
    const { id } = req.params;
    const registration = await Registration.findByPk(id);
    if (!registration) {
      return res.status(400).json('Registration not found');
    }
    return res.json(registration);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      plan_id: yup.number().required(),
      start_date: yup.date().required(),
      student_id: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { plan_id, start_date, student_id } = req.body;

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }
    const { id } = req.params;
    const registration = await Registration.findByPk(id);
    if (!registration) {
      return res.status(400).json({ error: 'Registration not found' });
    }
    const { end_date, price } = await registration.update({
      student_id,
      plan_id,
      start_date,
      end_date: addMonths(parseISO(start_date), plan.duration),
      price: plan.duration * plan.price,
    });

    return res.json({ id, student_id, plan_id, start_date, end_date, price });
  }

  async delete(req, res) {
    const { id } = req.params;
    await Registration.destroy({
      where: { id },
    });
    return res.json();
  }
}

export default new RegistrationController();
