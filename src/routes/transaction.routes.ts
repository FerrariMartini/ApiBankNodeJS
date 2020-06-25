import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import ValidateTransaction from '../services/ValidateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const allTransactions = transactionsRepository.all();
    const balanceObj = transactionsRepository.getBalance();
    const totalTransactions = {
      transactions: allTransactions,
      balance: balanceObj,
    };

    return response.json(totalTransactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const validateTransaction = new ValidateTransaction(transactionsRepository);

    validateTransaction.execute(value, type);

    const transactionsCreated = createTransaction.execute({
      title,
      value,
      type,
    });

    return response.json(transactionsCreated);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
