import React from "react";
import { Transaction } from "../../types/payment";
import {
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface TransactionItemProps {
  transaction: Transaction;
}

const getTransactionIcon = (type: string) => {
  switch (type) {
    case "deposit":
      return <ArrowDownLeft size={20} className="text-green-600" />;
    case "withdraw":
      return <ArrowUpRight size={20} className="text-red-600" />;
    case "transfer":
    case "funding":
      return <ArrowRight size={20} className="text-blue-600" />;
    case "payment":
      return <ArrowUpRight size={20} className="text-orange-600" />;
    default:
      return <ArrowRight size={20} className="text-gray-600" />;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle size={16} className="text-green-600" />;
    case "pending":
      return <Clock size={16} className="text-yellow-600" />;
    case "failed":
      return <AlertCircle size={16} className="text-red-600" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "text-green-600 bg-green-50";
    case "pending":
      return "text-yellow-600 bg-yellow-50";
    case "failed":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
}) => {
  const isIncoming =
    transaction.type === "deposit" || transaction.type === "funding";
  const amountColor = isIncoming ? "text-green-600" : "text-gray-800";

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition">
      <div className="flex items-center gap-4 flex-1">
        <div className="p-2 bg-gray-100 rounded-full">
          {getTransactionIcon(transaction.type)}
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-800">
            {transaction.description ||
              `${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}`}
          </p>
          <p className="text-sm text-gray-600">
            {transaction.sender} → {transaction.receiver}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(transaction.timestamp).toLocaleDateString()} at{" "}
            {new Date(transaction.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <div className="text-right flex items-center gap-3">
        <div>
          <p className={`font-bold text-lg ${amountColor}`}>
            {isIncoming ? "+" : "-"}${transaction.amount.toLocaleString()}
          </p>
          <div
            className={`flex items-center gap-1 mt-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(transaction.status)}`}
          >
            {getStatusIcon(transaction.status)}
            <span className="capitalize">{transaction.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
