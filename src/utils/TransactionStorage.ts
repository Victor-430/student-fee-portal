export const TransactionStorage = {
  getAll: (): TRANSACTION[] => {
    try {
      const data = localStorage.getItem(import.meta.env.STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as TRANSACTION[];
    } catch (error) {
      console.error("Error reading Transaction", error);
      return [];
    }
  },

  getById: (id: string): TRANSACTION | null => {
    const transactions = TransactionStorage.getAll();
    return transactions.find((t) => t.id === id) || null;
  },

  save: (transaction: TRANSACTION): boolean => {
    try {
      const transactions = TransactionStorage.getAll();
      transactions.unshift(transaction);
      const data = JSON.stringify(transactions);
      localStorage.setItem(import.meta.env.STORAGE_KEY, data);
      return true;
    } catch (error) {
      console.error("Error saving transaction", error);
      return false;
    }
  },

  update: (id: string, updates: Partial<TRANSACTION>): boolean => {
    try {
      const transactions = TransactionStorage.getAll();
      const index = transactions.findIndex((t) => t.id === id);
      if (index === -1) return false;

      transactions[index] = { ...transactions[index], ...updates };
      const data = JSON.stringify(transactions);

      localStorage.setItem(import.meta.env.STORAGE_KEY, data);
      return true;
    } catch (error) {
      console.error("Error updating transaction", error);
      return false;
    }
  },

  delete: (id: string): boolean => {
    try {
      const transactions = TransactionStorage.getAll();
      const filtered = transactions.filter((t) => t.id !== id);
      const data = JSON.stringify(filtered);
      localStorage.setItem(import.meta.env.STORAGE_KEY, data);
      return true;
    } catch (error) {
      console.error("Error deleting Transaction", error);
      return false;
    }
  },

  clear: (): void => {
    localStorage.removeItem(import.meta.env.STORAGE_KEY);
  },

  getByStatus: (status: TRANSACTIONSTATUS): TRANSACTION[] => {
    return TransactionStorage.getAll().filter((t) => t.status === status);
  },

  getTotalPaid: (): number => {
    const completed = TransactionStorage.getByStatus("Completed");
    return completed.reduce((sum, t) => sum + t.totalAmount, 0);
  },

  getByDateRange: (startDate: string, endDate: string): TRANSACTION[] => {
    const transactions = TransactionStorage.getAll();
    return transactions.filter((t) => {
      const date = new Date(t.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });
  },
};
