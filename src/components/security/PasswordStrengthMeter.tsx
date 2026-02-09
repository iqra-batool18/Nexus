import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Check, X } from "lucide-react";

interface PasswordStrengthMeterProps {
  password: string;
  onChange?: (password: string) => void;
  onStrengthChange?: (strength: "weak" | "fair" | "good" | "strong") => void;
}

const calculateStrength = (password: string) => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  if (strength <= 2) return "weak";
  if (strength <= 3) return "fair";
  if (strength <= 4) return "good";
  return "strong";
};

const getStrengthColor = (strength: string) => {
  switch (strength) {
    case "weak":
      return { color: "text-red-600", bg: "bg-red-100", fill: "bg-red-600" };
    case "fair":
      return {
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        fill: "bg-yellow-600",
      };
    case "good":
      return { color: "text-blue-600", bg: "bg-blue-100", fill: "bg-blue-600" };
    case "strong":
      return {
        color: "text-green-600",
        bg: "bg-green-100",
        fill: "bg-green-600",
      };
    default:
      return { color: "text-gray-600", bg: "bg-gray-100", fill: "bg-gray-600" };
  }
};

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  onChange,
  onStrengthChange,
}) => {
  const strength = calculateStrength(password);
  const { color, bg, fill } = getStrengthColor(strength);

  React.useEffect(() => {
    onStrengthChange?.(strength);
  }, [strength, onStrengthChange]);

  const requirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "At least 12 characters", met: password.length >= 12 },
    { label: "Lowercase letters (a-z)", met: /[a-z]/.test(password) },
    { label: "Uppercase letters (A-Z)", met: /[A-Z]/.test(password) },
    { label: "Numbers (0-9)", met: /[0-9]/.test(password) },
    { label: "Special characters (!@#$)", met: /[^a-zA-Z0-9]/.test(password) },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {password && (
        <>
          {/* Strength Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Password Strength
              </span>
              <span className={`text-sm font-semibold ${color}`}>
                {strength.charAt(0).toUpperCase() + strength.slice(1)}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${fill} transition-all duration-300`}
                style={{
                  width:
                    strength === "weak"
                      ? "25%"
                      : strength === "fair"
                        ? "50%"
                        : strength === "good"
                          ? "75%"
                          : "100%",
                }}
              />
            </div>
          </div>

          {/* Requirements Checklist */}
          <div className={`p-4 rounded-lg ${bg} space-y-2`}>
            <p className="text-sm font-semibold text-gray-800">Requirements:</p>
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {req.met ? (
                  <Check size={16} className="text-green-600 flex-shrink-0" />
                ) : (
                  <X size={16} className="text-gray-400 flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${req.met ? "text-gray-700 font-medium" : "text-gray-600"}`}
                >
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
