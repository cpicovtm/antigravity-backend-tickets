import { TicketService } from '../../../src/services/ticket.service';
import { TicketRepository } from '../../../src/repositories/ticket.repository';

describe('TicketService', () => {
  const service = new TicketService();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('CLIENTE solo debe consultar sus tickets', async () => {
    const repoSpy = jest
      .spyOn(TicketRepository.prototype, 'findAllByCreatorId')
      .mockResolvedValueOnce([]);

    await service.getAllTickets({ userId: '11111111-1111-4111-8111-111111111111', profileName: 'CLIENTE' });

    expect(repoSpy).toHaveBeenCalledWith('11111111-1111-4111-8111-111111111111');
  });

  it('ADMIN debe consultar todos los tickets', async () => {
    const allSpy = jest.spyOn(TicketRepository.prototype, 'findAll').mockResolvedValueOnce([]);
    const byCreatorSpy = jest.spyOn(TicketRepository.prototype, 'findAllByCreatorId');

    await service.getAllTickets({ userId: '11111111-1111-4111-8111-111111111111', profileName: 'ADMIN' });

    expect(allSpy).toHaveBeenCalledTimes(1);
    expect(byCreatorSpy).not.toHaveBeenCalled();
  });

  it('debe lanzar Ticket not found cuando no existe', async () => {
    jest.spyOn(TicketRepository.prototype, 'findById').mockResolvedValueOnce(null);

    await expect(
      service.getTicketById('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', {
        userId: '11111111-1111-4111-8111-111111111111',
        profileName: 'CLIENTE',
      }),
    ).rejects.toThrow('Ticket not found');
  });

  it('CLIENTE no debe acceder a ticket ajeno', async () => {
    jest.spyOn(TicketRepository.prototype, 'findById').mockResolvedValueOnce({
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      userId: '22222222-2222-4222-8222-222222222222',
    } as any);

    await expect(
      service.getTicketById('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', {
        userId: '11111111-1111-4111-8111-111111111111',
        profileName: 'CLIENTE',
      }),
    ).rejects.toThrow('Forbidden');
  });

  it('CLIENTE debe crear ticket forzando su userId', async () => {
    const createSpy = jest.spyOn(TicketRepository.prototype, 'create').mockResolvedValueOnce({} as any);

    await service.createTicket(
      { title: 'T', description: 'D', userId: '22222222-2222-4222-8222-222222222222' },
      { userId: '11111111-1111-4111-8111-111111111111', profileName: 'CLIENTE' },
    );

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({ userId: '11111111-1111-4111-8111-111111111111' }),
    );
  });

  it('ADMIN usa userId enviado o fallback al suyo', async () => {
    const createSpy = jest.spyOn(TicketRepository.prototype, 'create').mockResolvedValue({} as any);

    await service.createTicket(
      { title: 'T', description: 'D', userId: '33333333-3333-4333-8333-333333333333' },
      { userId: '11111111-1111-4111-8111-111111111111', profileName: 'ADMIN' },
    );
    expect(createSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ userId: '33333333-3333-4333-8333-333333333333' }),
    );

    await service.createTicket(
      { title: 'T', description: 'D' },
      { userId: '11111111-1111-4111-8111-111111111111', profileName: 'ADMIN' },
    );
    expect(createSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ userId: '11111111-1111-4111-8111-111111111111' }),
    );
  });
});
