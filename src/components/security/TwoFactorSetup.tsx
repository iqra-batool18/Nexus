import React, { useState, useEffect } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Lock, AlertCircle } from "lucide-react";

interface TwoFactorSetupProps {
  onComplete?: (method: "email" | "sms" | "authenticator") => void;
  onCancel?: () => void;
}

export const TwoFactorSetup: React.FC<TwoFactorSetupProps> = ({
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState<"method" | "verify">("method");
  const [method, setMethod] = useState<"email" | "sms" | "authenticator">(
    "email",
  );
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (step === "verify" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, step]);

  const handleMethodSelect = (selectedMethod: typeof method) => {
    setMethod(selectedMethod);
    setStep("verify");
    setOtp("");
    setTimeLeft(300);
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setVerified(true);
      setTimeout(() => {
        onComplete?.(method);
      }, 1500);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (verified) {
    return (
      <Card className="p-8 text-center">
        <div className="text-green-600 text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600">2FA has been enabled for your account</p>
      </Card>
    );
  }

  if (step === "method") {
    return (
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <Lock size={24} className="text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            Enable Two-Factor Authentication
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: "email",
              icon: "✉️",
              title: "Email",
              desc: "Receive OTP via email",
            },
            {
              id: "sms",
              icon: "📱",
              title: "SMS",
              desc: "Receive OTP via text",
            },
            {
              id: "authenticator",
              icon: "🔑",
              title: "Authenticator",
              desc: "Use authenticator app",
            },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleMethodSelect(opt.id as typeof method)}
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition text-center"
            >
              <div className="text-4xl mb-2">{opt.icon}</div>
              <p className="font-semibold text-gray-800">{opt.title}</p>
              <p className="text-sm text-gray-600">{opt.desc}</p>
            </button>
          ))}
        </div>

        <button
          onClick={onCancel}
          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Verify Your {method.toUpperCase()}
      </h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle size={20} className="text-blue-600 flex-shrink-0" />
        <div className="text-sm text-blue-900">
          <p className="font-medium">Check your {method}</p>
          <p>
            {method === "email"
              ? "We sent a code to your email"
              : method === "sms"
                ? "We sent a code to your phone"
                : "Enter the code from your authenticator app"}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Enter 6-digit Code
        </label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.slice(0, 6))}
          placeholder="000000"
          maxLength={6}
          className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
        />
      </div>

      <div className="text-sm text-center text-gray-600">
        Code expires in{" "}
        <span className="font-semibold">{formatTime(timeLeft)}</span>
      </div>

      {otp.length === 6 && (
        <Button onClick={handleVerifyOTP} variant="primary" className="w-full">
          Verify
        </Button>
      )}

      <button
        onClick={() => setStep("method")}
        className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
      >
        Back
      </button>
    </Card>
  );
};
