import React, { useState } from "react";
import { WalletOverview } from "../../components/payment/WalletOverview";
import { TransactionItem } from "../../components/payment/TransactionItem";
import { FundingRoundCard } from "../../components/payment/FundingRoundCard";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { mockWallet, mockFundingRounds } from "../../data/payments";
import { Wallet, Transaction, FundingRound } from "../../types/payment";
import {
  CreditCard,
  Send,
  ArrowDownLeft,
  ArrowUpRight,
  History,
  Rocket,
  LayoutDashboard,
} from "lucide-react";

export const PaymentPage: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet>(mockWallet);
  const [fundingRounds] = useState<FundingRound[]>(mockFundingRounds);
  const [activeTab, setActiveTab] = useState<
    "wallet" | "transactions" | "funding"
  >("wallet");
  const [showModal, setShowModal] = useState<
    "deposit" | "withdraw" | "transfer" | null
  >("null");
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
    <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-6">
      {/* 1. COMPACT GLASS HEADER */}
      <header className="relative overflow-hidden rounded-2xl bg-slate-900 p-8 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
              <CreditCard size={32} className="text-primary-400" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Financial Hub
              </h1>
              <p className="text-slate-400 text-sm font-medium">
                Control your capital and venture investments
              </p>
            </div>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl backdrop-blur-sm border border-white/10">
            <button
              onClick={() => setActiveTab("wallet")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === "wallet"
                  ? "bg-white text-slate-900 shadow-lg"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <LayoutDashboard size={16} /> Overview
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === "transactions"
                  ? "bg-white text-slate-900 shadow-lg"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <History size={16} /> History
            </button>
            <button
              onClick={() => setActiveTab("funding")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === "funding"
                  ? "bg-white text-slate-900 shadow-lg"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Rocket size={16} /> Deals
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary-500/20 blur-[100px] rounded-full" />
      </header>

      {/* 2. MAIN GRID CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SIDEBAR: Wallet Actions (Always Visible or First) */}
        <aside className="lg:col-span-4 space-y-6">
          <WalletOverview
            wallet={wallet}
            onDeposit={() => setShowModal("deposit")}
            onWithdraw={() => setShowModal("withdraw")}
            onTransfer={() => setShowModal("transfer")}
          />

          {/* Quick Action Guide Card */}
          <Card className="p-5 bg-primary-50 border-primary-100 hidden lg:block">
            <h4 className="text-sm font-bold text-primary-900 uppercase tracking-wider mb-2">
              Investment Tip
            </h4>
            <p className="text-sm text-primary-700 leading-relaxed">
              Ensure your wallet balance is sufficient before participating in
              "Series A" funding rounds to avoid transaction delays.
            </p>
          </Card>
        </aside>

        {/* MAIN VIEW: Dynamic Content */}
        <main className="lg:col-span-8">
          {activeTab === "wallet" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="p-6 border-none shadow-xl bg-white ring-1 ring-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Recent Transactions
                  </h2>
                  <button
                    onClick={() => setActiveTab("transactions")}
                    className="text-sm font-bold text-primary-600 hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {wallet.transactions.slice(0, 5).map((txn) => (
                    <TransactionItem key={txn.id} transaction={txn} />
                  ))}
                  {wallet.transactions.length === 0 && (
                    <p className="text-center py-10 text-slate-400">
                      Your transaction feed is empty.
                    </p>
                  )}
                </div>
              </Card>
            </div>
          )}

          {activeTab === "transactions" && (
            <Card className="p-6 border-none shadow-xl bg-white ring-1 ring-slate-200 animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                  <History size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Full Ledger
                </h2>
              </div>
              <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                {wallet.transactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <History size={48} className="mb-4 opacity-20" />
                    <p>No activity recorded yet</p>
                  </div>
                ) : (
                  wallet.transactions.map((txn) => (
                    <TransactionItem key={txn.id} transaction={txn} />
                  ))
                )}
              </div>
            </Card>
          )}

          {activeTab === "funding" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-500">
              {fundingRounds.map((round) => (
                <FundingRoundCard
                  key={round.id}
                  round={round}
                  onInvest={handleInvest}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* 3. MODAL RE-DESIGN */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md shadow-2xl border-none overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-black text-slate-900 capitalize">
                  {showModal === "deposit"
                    ? "Deposit"
                    : showModal === "withdraw"
                      ? "Withdraw"
                      : "Transfer"}
                </h2>
                <div
                  className={`p-2 rounded-full ${showModal === "deposit" ? "bg-green-100 text-green-600" : "bg-primary-100 text-primary-600"}`}
                >
                  {showModal === "deposit" ? (
                    <ArrowDownLeft size={20} />
                  ) : (
                    <ArrowUpRight size={20} />
                  )}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                    Value (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                      $
                    </span>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-lg focus:border-primary-500 focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                {showModal === "transfer" && (
                  <>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                        Recipient Entity
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
                        placeholder="Organization or user name"
                        className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-primary-500 focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                        Reference
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
                        placeholder="Memo"
                        className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl font-medium focus:border-primary-500 focus:bg-white outline-none"
                      />
                    </div>
                  </>
                )}

                {showModal === "deposit" && (
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                      Source Account
                    </label>
                    <select className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold appearance-none outline-none focus:border-primary-500">
                      {wallet.accounts.map((acc) => (
                        <option key={acc.id}>{acc.accountName}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => {
                    setShowModal(null);
                    setFormData({ amount: "", recipient: "", description: "" });
                  }}
                  className="flex-1 px-4 py-4 font-bold text-slate-500 rounded-xl hover:bg-slate-100 transition"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => {
                    if (showModal === "deposit") handleDeposit();
                    else if (showModal === "withdraw") handleWithdraw();
                    else if (showModal === "transfer") handleTransfer();
                  }}
                  className="flex-1 px-4 py-4 bg-slate-900 text-white rounded-xl hover:bg-black shadow-lg shadow-slate-200 transition font-bold"
                >
                  Execute
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
