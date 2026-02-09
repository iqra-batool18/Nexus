import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PasswordStrengthMeter } from "../../components/security/PasswordStrengthMeter";
import { TwoFactorSetup } from "../../components/security/TwoFactorSetup";
import { Shield, Lock, Key, AlertCircle, CheckCircle } from "lucide-react";

export const SecurityPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "fair" | "good" | "strong"
  >("weak");
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [sessions, setSessions] = useState([
    {
      id: "1",
      device: "Chrome on macOS",
      location: "San Francisco, CA",
      lastActive: "2 minutes ago",
      current: true,
    },
    {
      id: "2",
      device: "Safari on iPhone",
      location: "San Francisco, CA",
      lastActive: "1 day ago",
      current: false,
    },
    {
      id: "3",
      device: "Firefox on Windows",
      location: "New York, NY",
      lastActive: "1 week ago",
      current: false,
    },
  ]);

  const handleChangePassword = () => {
    if (passwordStrength === "strong") {
      alert("Password changed successfully!");
      setPassword("");
    } else {
      alert("Please use a stronger password");
    }
  };

  const handleLogoutSession = (sessionId: string) => {
    setSessions(sessions.filter((s) => s.id !== sessionId));
  };

  const handleEnable2FA = (method: string) => {
    setTwoFAEnabled(true);
    setShow2FASetup(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Shield size={32} />
          <h1 className="text-3xl font-bold">Security Settings</h1>
        </div>
        <p className="text-primary-100">
          Protect your account with strong security measures
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password Management */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock size={24} className="text-primary-600" />
            <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
          </div>

          <PasswordStrengthMeter
            password={password}
            onChange={setPassword}
            onStrengthChange={setPasswordStrength}
          />

          <Button
            onClick={handleChangePassword}
            variant="primary"
            className="w-full mt-6"
            disabled={passwordStrength !== "strong"}
          >
            Update Password
          </Button>
        </Card>

        {/* Two-Factor Authentication */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Key size={24} className="text-primary-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Two-Factor Authentication
              </h2>
            </div>
            {twoFAEnabled && (
              <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                <CheckCircle size={16} />
                Enabled
              </span>
            )}
          </div>

          {!twoFAEnabled ? (
            <>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3 mb-4">
                <AlertCircle
                  size={20}
                  className="text-yellow-600 flex-shrink-0"
                />
                <div className="text-sm text-yellow-900">
                  <p className="font-medium">Enhance your account security</p>
                  <p>Enable 2FA to add an extra layer of protection</p>
                </div>
              </div>
              <Button
                onClick={() => setShow2FASetup(true)}
                variant="primary"
                className="w-full"
              >
                Enable 2FA
              </Button>
            </>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-900 font-medium mb-2">✓ 2FA is active</p>
              <p className="text-sm text-green-800">
                Your account is protected with two-factor authentication
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Active Sessions */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Shield size={24} />
          Active Sessions
        </h2>
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="p-4 border border-gray-200 rounded-lg flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-gray-800">
                    {session.device}
                  </p>
                  {session.current && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{session.location}</p>
                <p className="text-xs text-gray-500">
                  Last active: {session.lastActive}
                </p>
              </div>
              {!session.current && (
                <button
                  onClick={() => handleLogoutSession(session.id)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition font-medium text-sm"
                >
                  Logout
                </button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Security Recommendations */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          Security Checklist
        </h2>
        <div className="space-y-3">
          {[
            { item: "Strong password set", done: password.length > 0 },
            { item: "Two-factor authentication enabled", done: twoFAEnabled },
            { item: "Email verified", done: true },
            { item: "No suspicious activity", done: true },
          ].map((check, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span
                className={
                  check.done
                    ? "text-green-600 text-lg"
                    : "text-gray-400 text-lg"
                }
              >
                {check.done ? "✓" : "○"}
              </span>
              <span
                className={
                  check.done ? "text-blue-900 font-medium" : "text-blue-700"
                }
              >
                {check.item}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* 2FA Setup Modal */}
      {show2FASetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl">
            <TwoFactorSetup
              onComplete={handleEnable2FA}
              onCancel={() => setShow2FASetup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
