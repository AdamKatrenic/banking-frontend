"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Account } from "../lib/types";
import { getToken, logout, getUserEmail } from "../lib/auth";
import { useAccounts } from "../hooks/useAccounts";
import { useTransactions } from "../hooks/useTransactions";
import api from "../lib/api";
import TransactionChart from "../components/dashboard/TransactionChart";

import PageWrapper from "../components/layout/PageWrapper";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import AccountList from "../components/dashboard/AccountList";
import QuickActions from "../components/dashboard/QuickActions";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import DepositModal from "../components/modals/DepositModal";
import WithdrawModal from "../components/modals/WithdrawModal";
import TransferModal from "../components/modals/TransferModal";

type ModalType = "deposit" | "withdraw" | "transfer" | null;

export default function DashboardPage() {
  const router = useRouter();
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [modal, setModal] = useState<ModalType>(null);
  const userName = getUserEmail() || "User";

  const { accounts, loading: accountsLoading, fetchAccounts } = useAccounts();
  const {
    transactions,
    loading: txLoading,
    fetchTransactions,
  } = useTransactions();

  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
      return;
    }
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      fetchTransactions(selectedAccount.accountNumber);
    }
  }, [selectedAccount]);

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + Number(acc.balance),
    0,
  );

  const handleCreateAccount = async () => {
    try {
      await api.post("/api/accounts");
      fetchAccounts();
    } catch {
      console.error("Failed to create account");
    }
  };

  const handleSuccess = () => {
    fetchAccounts();
    if (selectedAccount) {
      fetchTransactions(selectedAccount.accountNumber);
    }
  };

  return (
    <PageWrapper>
      <WelcomeBanner name={userName} totalBalance={totalBalance} />

      <AccountList
        accounts={accounts}
        selectedAccount={selectedAccount}
        onSelect={setSelectedAccount}
        onCreateAccount={handleCreateAccount}
        loading={accountsLoading}
      />

      <QuickActions
        onDeposit={() => setModal("deposit")}
        onWithdraw={() => setModal("withdraw")}
        onTransfer={() => setModal("transfer")}
        disabled={!selectedAccount}
      />

      <RecentTransactions
        transactions={transactions}
        loading={txLoading}
        accountNumber={selectedAccount?.accountNumber}
      />

      <div className="mt-6">
        <TransactionChart transactions={transactions} />
      </div>

      {modal === "deposit" && selectedAccount && (
        <DepositModal
          accountNumber={selectedAccount.accountNumber}
          onClose={() => setModal(null)}
          onSuccess={handleSuccess}
        />
      )}

      {modal === "withdraw" && selectedAccount && (
        <WithdrawModal
          accountNumber={selectedAccount.accountNumber}
          onClose={() => setModal(null)}
          onSuccess={handleSuccess}
        />
      )}

      {modal === "transfer" && selectedAccount && (
        <TransferModal
          accountNumber={selectedAccount.accountNumber}
          onClose={() => setModal(null)}
          onSuccess={handleSuccess}
        />
      )}
    </PageWrapper>
  );
}
