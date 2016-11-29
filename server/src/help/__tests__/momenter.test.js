import faker from 'faker';
import momenter from '../momenter';

describe('momenter help', () => {
  it('when have setting timezone', async () => {
    expect(momenter().tz()).toBe('Asia/Taipei');
    expect(momenter(
      Date.now()
    ).tz()).toBe('Asia/Taipei');
    expect(momenter(
      faker.date.recent().toJSON().substr(0, 10),
      'YYYY-MM-DD'
    ).tz()).toBe('Asia/Taipei');
  });

  it('when not have setting timezone', async () => {
    expect(momenter('JP').tz()).toBe('Asia/Tokyo');
    expect(momenter(
      Date.now(),
      'JP',
    ).tz()).toBe('Asia/Tokyo');
    expect(momenter(
      faker.date.recent().toJSON().substr(0, 10),
      'YYYY-MM-DD',
      'JP',
    ).tz()).toBe('Asia/Tokyo');
  });
});
