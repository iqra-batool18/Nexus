import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PasswordStrengthMeter } from "../../components/security/PasswordStrengthMeter";
import { TwoFactorSetup } from "../../components/security/TwoFactorSetup";
import {
  Shield,
  Lock,
  Key,
  AlertCircle,
  CheckCircle,
  Smartphone,
  Globe,
} from "lucide-react";

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
    <div className="max-w-7xl mx-auto space-y-8 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Security Settings
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your account security, passwords, and active sessions.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
          <Shield size={18} />
          Account Protected
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-8">
          <Card className="p-0 overflow-hidden border-none shadow-lg">
            <div className="bg-white p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Lock size={22} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Update Password
                </h2>
              </div>
              <div className="space-y-4">
                <PasswordStrengthMeter
                  password={password}
                  onChange={setPassword}
                  onStrengthChange={setPasswordStrength}
                />
                <Button
                  onClick={handleChangePassword}
                  variant="primary"
                  className="w-full py-3 shadow-md"
                  disabled={passwordStrength !== "strong"}
                >
                  Save New Password
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-none shadow-lg bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Key size={22} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Two-Factor Auth
                </h2>
              </div>
              {twoFAEnabled && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle size={14} /> ACTIVE
                </span>
              )}
            </div>

            {!twoFAEnabled ? (
              <div className="group border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <div className="mx-auto w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Add an extra layer of security
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  Requires a verification code whenever you sign in from an
                  unrecognized device.
                </p>
                <Button
                  onClick={() => setShow2FASetup(true)}
                  variant="primary"
                  className="px-8"
                >
                  Configure 2FA
                </Button>
              </div>
            ) : (
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="mt-1 text-green-600">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="text-green-900 font-bold">
                    2FA is currently protecting your account
                  </p>
                  <p className="text-sm text-green-700">
                    Settings can be modified by contacting support or using your
                    recovery keys.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="p-6 border-none shadow-lg bg-white h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Globe size={22} className="text-gray-400" />
                Active Sessions
              </h2>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {sessions.length} Active
              </span>
            </div>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`group relative p-4 rounded-xl border transition-all ${
                    session.current
                      ? "border-blue-200 bg-blue-50/30"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div
                        className={`p-2 rounded-lg h-fit ${session.current ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}
                      >
                        <Smartphone size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-gray-800">
                            {session.device}
                          </p>
                          {session.current && (
                            <span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded uppercase">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {session.location}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1 uppercase font-medium tracking-tighter">
                          {session.lastActive}
                        </p>
                      </div>
                    </div>
                    {!session.current && (
                      <button
                        onClick={() => handleLogoutSession(session.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-red-500 hover:text-red-700 underline underline-offset-4"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Checklist */}
      <Card className="p-8 bg-gray-900 border-none shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Shield size={120} className="text-white" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-6">
            Security Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { item: "Strong password set", done: password.length > 0 },
              { item: "2FA enabled", done: twoFAEnabled },
              { item: "Email verified", done: true },
              { item: "No suspicious activity", done: true },
            ].map((check, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    check.done
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-600 text-gray-600"
                  }`}
                >
                  {check.done ? (
                    <CheckCircle size={14} />
                  ) : (
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                  )}
                </div>
                <span
                  className={`text-sm font-semibold ${check.done ? "text-gray-100" : "text-gray-500"}`}
                >
                  {check.item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {show2FASetup && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl transform transition-all">
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
