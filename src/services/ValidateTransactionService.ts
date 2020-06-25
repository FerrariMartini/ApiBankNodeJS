import TransactionsRepository from '../repositories/TransactionsRepository';

class ValidadeTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(outcome: number, type: string): void {
    const balace = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balace.total < outcome) {
      throw new Error('Outcome > Total');
    }
  }
}

export default ValidadeTransactionService;
