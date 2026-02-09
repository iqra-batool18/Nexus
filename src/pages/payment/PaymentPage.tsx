import React, { useState } from "react";
import { WalletOverview } from "../../components/payment/WalletOverview";
import { TransactionItem } from "../../components/payment/TransactionItem";
import { FundingRoundCard } from "../../components/payment/FundingRoundCard";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { mockWallet, mockFundingRounds } from "../../data/payments";
import { Wallet, Transaction, FundingRound } from "../../types/payment";
import { CreditCard, Send, ArrowDownLeft, ArrowUpRight } from "lucide-react";

export const PaymentPage: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet>(mockWallet);
  const [fundingRounds] = useState<FundingRound[]>(mockFundingRounds);
  const [activeTab, setActiveTab] = useState<
    "wallet" | "transactions" | "funding"
  >("wallet");
  const [showModal, setShowModal] = useState<
    "deposit" | "withdraw" | "transfer" | null
  >(null);
  const [formData, setFormData] = useState({
    amount: "",
    recipient: "",
    description: "",
  });

  const handleDeposit = () => {
    if (formData.amount) {
      const newTxn: Transaction = {
        id: "txn-" + Date.now(),
        type: "deposit",
        amount: parseFloat(formData.amount),
        currency: "USD",
        sender: "Bank Account",
        receiver: "You",
        status: "completed",
        timestamp: new Date().toISOString(),
        description: "Deposit from bank account",
      };
      setWallet({
        ...wallet,
        balance: wallet.balance + parseFloat(formData.amount),
        transactions: [newTxn, ...wallet.transactions],
      });
      setShowModal(null);
      setFormData({ amount: "", recipient: "", description: "" });
    }
  };

  const handleWithdraw = () => {
    if (formData.amount) {
      const amount = parseFloat(formData.amount);
      if (amount <= wallet.balance) {
        const newTxn: Transaction = {
          id: "txn-" + Date.now(),
          type: "withdraw",
          amount,
          currency: "USD",
          sender: "You",
          receiver: "Bank Account",
          status: "pending",
          timestamp: new Date().toISOString(),
          description: "Withdrawal request",
        };
        setWallet({
          ...wallet,
          balance: wallet.balance - amount,
          transactions: [newTxn, ...wallet.transactions],
        });
        setShowModal(null);
        setFormData({ amount: "", recipient: "", description: "" });
      }
    }
  };

  const handleTransfer = () => {
    if (formData.amount && formData.recipient) {
      const amount = parseFloat(formData.amount);
      if (amount <= wallet.balance) {
        const newTxn: Transaction = {
          id: "txn-" + Date.now(),
          type: "transfer",
          amount,
          currency: "USD",
          sender: "You",
          receiver: formData.recipient,
          status: "completed",
          timestamp: new Date().toISOString(),
          description: formData.description || "Transfer",
        };
        setWallet({
          ...wallet,
          balance: wallet.balance - amount,
          transactions: [newTxn, ...wallet.transactions],
        });
        setShowModal(null);
        setFormData({ amount: "", recipient: "", description: "" });
      }
    }
  };

  const handleInvest = (roundId: string, amount: number) => {
    if (amount <= wallet.balance) {
      // Simulate investment
      const newTxn: Transaction = {
        id: "txn-" + Date.now(),
        type: "funding",
        amount,
        currency: "USD",
        sender: "You",
        receiver: "Tech Startup Inc",
        status: "completed",
        timestamp: new Date().toISOString(),
        description: "Investment in Series A Round",
        relatedDealId: roundId,
      };
      setWallet({
        ...wallet,
        balance: wallet.balance - amount,
        transactions: [newTxn, ...wallet.transactions],
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <CreditCard size={32} />
          <h1 className="text-3xl font-bold">Payment & Wallet</h1>
        </div>
        <p className="text-primary-100">Manage your finances and fund deals</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("wallet")}
          className={`px-6 py-3 font-medium border-b-2 transition ${
            activeTab === "wallet"
              ? "border-primary-600 text-primary-600"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
        >
          Wallet
        </button>
        <button
          onClick={() => setActiveTab("transactions")}
          className={`px-6 py-3 font-medium border-b-2 transition ${
            activeTab === "transactions"
              ? "border-primary-600 text-primary-600"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab("funding")}
          className={`px-6 py-3 font-medium border-b-2 transition ${
            activeTab === "funding"
              ? "border-primary-600 text-primary-600"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
        >
          Funding Rounds
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "wallet" && (
        <WalletOverview
          wallet={wallet}
          onDeposit={() => setShowModal("deposit")}
          onWithdraw={() => setShowModal("withdraw")}
          onTransfer={() => setShowModal("transfer")}
        />
      )}

      {activeTab === "transactions" && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Transaction History
          </h2>
          <div className="border border-gray-200 rounded-lg">
            {wallet.transactions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No transactions yet
              </p>
            ) : (
              wallet.transactions.map((txn) => (
                <TransactionItem key={txn.id} transaction={txn} />
              ))
            )}
          </div>
        </Card>
      )}

      {activeTab === "funding" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fundingRounds.map((round) => (
              <FundingRoundCard
                key={round.id}
                round={round}
                onInvest={handleInvest}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
                {showModal === "deposit"
                  ? "Deposit Funds"
                  : showModal === "withdraw"
                    ? "Withdraw Funds"
                    : "Transfer Money"}
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {showModal === "transfer" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Recipient
                      </label>
                      <input
                        type="text"
                        value={formData.recipient}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            recipient: e.target.value,
                          })
                        }
                        placeholder="Enter recipient name"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Description (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        placeholder="What is this for?"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </>
                )}

                {showModal === "deposit" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      From Account
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500">
                      {wallet.accounts.map((acc) => (
                        <option key={acc.id}>{acc.accountName}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowModal(null);
                    setFormData({ amount: "", recipient: "", description: "" });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (showModal === "deposit") handleDeposit();
                    else if (showModal === "withdraw") handleWithdraw();
                    else if (showModal === "transfer") handleTransfer();
                  }}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition font-medium"
                >
                  Confirm
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
