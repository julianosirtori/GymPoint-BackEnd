import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { student, plan, registration } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Registro Academia - GymPoint',
      template: 'registration',
      context: {
        student: student.name,
        plan: plan.title,
        start_date: registration.start_date,
        end_date: registration.end_date,
        price: registration.price,
      },
    });
  }
}

export default new RegistrationMail();
