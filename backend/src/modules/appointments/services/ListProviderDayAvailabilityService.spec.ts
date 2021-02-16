import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the hours available in a day', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user123',
      user_id: 'user456',
      date: new Date(2020, 4, 2, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user123',
      user_id: 'user456',
      date: new Date(2020, 4, 2, 13, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 2, 10, 0, 0).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user123',
      year: 2020,
      month: 5,
      day: 2,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: true },
        { hour: 13, available: false },
        { hour: 14, available: true },
      ]),
    );
  });
});
