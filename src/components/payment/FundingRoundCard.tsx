import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { FundingRound } from "../../types/payment";
import { TrendingUp, Users, Target, AlertCircle } from "lucide-react";

interface FundingRoundCardProps {
  round: FundingRound;
  onInvest?: (roundId: string, amount: number) => void;
}

export const FundingRoundCard: React.FC<FundingRoundCardProps> = ({
  round,
  onInvest,
}) => {
  const [investAmount, setInvestAmount] = useState("");
  const [showInvestForm, setShowInvestForm] = useState(false);

  const progressPercentage = (round.raisedAmount / round.targetAmount) * 100;
  const remaining = round.targetAmount - round.raisedAmount;
  const daysLeft = Math.ceil(
    (new Date(round.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  const handleInvest = () => {
    if (investAmount && parseFloat(investAmount) > 0) {
      onInvest?.(round.id, parseFloat(investAmount));
      setInvestAmount("");
      setShowInvestForm(false);
    }
  };

  return (
    <Card className="p-6 border-t-4 border-primary-500">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Series A Funding Round
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <AlertCircle size={16} />
          <span>{daysLeft} days remaining</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-sm font-medium text-gray-700">Progress</p>
            <p className="text-2xl font-bold text-primary-600">
              ${round.raisedAmount.toLocaleString()}
            </p>
          </div>
          <p className="text-sm text-gray-600">
            Target: ${round.targetAmount.toLocaleString()}
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {Math.round(progressPercentage)}% funded • $
          {remaining.toLocaleString()} remaining
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <Users size={16} />
            <span className="text-sm font-medium">Investors</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {round.investors.length}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">Avg Investment</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            $
            {(round.raisedAmount / round.investors.length).toLocaleString(
              "en-US",
              {
                maximumFractionDigits: 0,
              },
            )}
          </p>
        </div>
      </div>

      {/* Recent Investors */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Recent Investors</h4>
        <div className="space-y-2">
          {round.investors.slice(0, 3).map((investor) => (
            <div
              key={investor.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {investor.investorName}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(investor.timestamp).toLocaleDateString()}
                </p>
              </div>
              <p className="font-bold text-gray-800">
                ${investor.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Invest Section */}
      {!showInvestForm ? (
        <Button
          onClick={() => setShowInvestForm(true)}
          variant="primary"
          className="w-full"
        >
          Invest Now
        </Button>
      ) : (
        <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <label className="block text-sm font-medium text-gray-800">
            Investment Amount (USD)
          </label>
          <input
            type="number"
            value={investAmount}
            onChange={(e) => setInvestAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            min="0"
          />
          <div className="flex gap-2">
            <Button onClick={handleInvest} variant="primary" className="flex-1">
              Confirm Investment
            </Button>
            <button
              onClick={() => {
                setShowInvestForm(false);
                setInvestAmount("");
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};
