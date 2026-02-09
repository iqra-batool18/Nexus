import React from "react";
import { Wallet } from "../../types/payment";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { ArrowUpRight, ArrowDownLeft, Send, CreditCard } from "lucide-react";

interface WalletOverviewProps {
  wallet: Wallet;
  onDeposit?: () => void;
  onWithdraw?: () => void;
  onTransfer?: () => void;
}

export const WalletOverview: React.FC<WalletOverviewProps> = ({
  wallet,
  onDeposit,
  onWithdraw,
  onTransfer,
}) => {
  const recentTransactions = wallet.transactions.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Main Wallet Card */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg p-8 text-white shadow-lg">
        <p className="text-primary-100 text-sm font-medium mb-2">
          Total Balance
        </p>
        <h2 className="text-4xl font-bold mb-2">
          ${wallet.balance.toLocaleString()} {wallet.currency}
        </h2>
        <p className="text-primary-100 text-sm">Wallet ID: {wallet.id}</p>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mt-8">
          <button
            onClick={onDeposit}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg py-3 px-4 flex flex-col items-center justify-center gap-2 transition"
          >
            <ArrowDownLeft size={24} />
            <span className="text-sm font-medium">Deposit</span>
          </button>
          <button
            onClick={onWithdraw}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg py-3 px-4 flex flex-col items-center justify-center gap-2 transition"
          >
            <ArrowUpRight size={24} />
            <span className="text-sm font-medium">Withdraw</span>
          </button>
          <button
            onClick={onTransfer}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg py-3 px-4 flex flex-col items-center justify-center gap-2 transition"
          >
            <Send size={24} />
            <span className="text-sm font-medium">Transfer</span>
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CreditCard size={24} />
          Payment Methods
        </h3>
        <div className="space-y-3">
          {wallet.accounts.map((account) => (
            <div
              key={account.id}
              className={`p-4 rounded-lg border-2 ${
                account.isDefault
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">
                    {account.accountName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {account.accountNumber}
                  </p>
                  {account.expiryDate && (
                    <p className="text-sm text-gray-600">
                      Expires: {account.expiryDate}
                    </p>
                  )}
                </div>
                {account.isDefault && (
                  <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Recent Transactions
        </h3>
        <div className="space-y-2">
          {recentTransactions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No transactions yet
            </p>
          ) : (
            recentTransactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {txn.description || txn.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(txn.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-bold text-gray-800">
                  {txn.type === "deposit" || txn.type === "funding" ? "+" : "-"}
                  ${txn.amount}
                </p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
