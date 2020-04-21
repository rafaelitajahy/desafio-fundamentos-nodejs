import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private income: number;

  private outcome: number;

  private total: number;

  constructor() {
    this.transactions = [];
    this.income = 0;
    this.outcome = 0;
    this.total = 0;
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    this.income = 0;
    this.outcome = 0;
    this.total = 0;

    this.transactions.map(transaction => {
      this.income += transaction.type === 'income' ? transaction.value : 0;
      this.outcome += transaction.type === 'outcome' ? transaction.value : 0;
      return this;
    });

    const balance: Balance = {
      income: this.income,
      outcome: this.outcome,
      total: this.income - this.outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
