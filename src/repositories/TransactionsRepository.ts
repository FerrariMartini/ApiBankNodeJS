import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeValues = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(incomeTransaction => incomeTransaction.value)
      .reduce((total: number, value: number) => {
        return total + value;
      }, 0);

    const outcomeValues = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(incomeTransaction => incomeTransaction.value)
      .reduce((total: number, value: number) => {
        return total + value;
      }, 0);

    const total = incomeValues - outcomeValues;

    this.balance = {
      income: incomeValues,
      outcome: outcomeValues,
      total,
    };

    return this.balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transactionObj = new Transaction({ title, value, type });
    this.transactions.push(transactionObj);
    return transactionObj;
  }
}

export default TransactionsRepository;
