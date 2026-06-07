export interface User {
  id: number;
  fullName: string;
  email: string;
}

export interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  createdAt: string;
}

export interface Transaction {
  id: number;
  type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
  amount: number;
  fromAccount: string | null;
  toAccount: string | null;
  createdAt: string;
}

export interface TransactionRequest {
  accountNumber: string;
  amount: number;
  toAccountNumber?: string;
}