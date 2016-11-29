import faker from 'faker';
import PaymentRequiredError from '../PaymentRequiredError';

describe('PaymentRequiredError error', () => {
  it('constructor', async () => {
    const error1 = new PaymentRequiredError();
    expect(error1.name).toBe('PaymentRequiredError');
    expect(error1.message).toBe('需要升級方案');
    const message = faker.lorem.sentence();
    const error2 = new PaymentRequiredError(message);
    expect(error2.name).toBe('PaymentRequiredError');
    expect(error2.message).toBe(message);
  });
});
