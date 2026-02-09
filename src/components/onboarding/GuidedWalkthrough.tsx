import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { ChevronRight, X, CheckCircle } from "lucide-react";

export interface GuideStep {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: string;
  completed?: boolean;
}

const GUIDE_STEPS: GuideStep[] = [
  {
    id: "dashboard",
    title: "Dashboard Overview",
    description: "View your dashboard with key metrics and recent activity",
    link: "/dashboard/entrepreneur",
    icon: "📊",
  },
  {
    id: "calendar",
    title: "Schedule Meetings",
    description: "Manage your availability and schedule meetings with others",
    link: "/calendar",
    icon: "📅",
  },
  {
    id: "video",
    title: "Video Calling",
    description: "Start video calls with investors or other entrepreneurs",
    link: "/video",
    icon: "📹",
  },
  {
    id: "documents",
    title: "Document Chamber",
    description: "Upload, manage, and sign important deal documents",
    link: "/document-chamber",
    icon: "📄",
  },
  {
    id: "payment",
    title: "Payment & Wallet",
    description: "Manage your wallet and participate in funding rounds",
    link: "/payment",
    icon: "💳",
  },
  {
    id: "security",
    title: "Security Settings",
    description: "Secure your account with strong passwords and 2FA",
    link: "/security",
    icon: "🔒",
  },
];

interface GuidedWalkthroughProps {
  onClose?: () => void;
  onStepClick?: (step: GuideStep) => void;
}

export const GuidedWalkthrough: React.FC<GuidedWalkthroughProps> = ({
  onClose,
  onStepClick,
}) => {
  const [steps, setSteps] = useState<GuideStep[]>(GUIDE_STEPS);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const handleStepComplete = (stepId: string) => {
    const updated = steps.map((s) =>
      s.id === stepId ? { ...s, completed: true } : s,
    );
    setSteps(updated);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const completedCount = steps.filter((s) => s.completed).length;
  const progress = (completedCount / steps.length) * 100;

  if (showAll) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Nexus Platform Tour
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progress: {completedCount} of {steps.length} steps
            </span>
            <span className="text-sm font-bold text-primary-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className={`p-4 rounded-lg border-2 transition cursor-pointer ${
                step.completed
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-white hover:border-primary-300"
              }`}
              onClick={() => {
                if (onStepClick) onStepClick(step);
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-3xl">{step.icon}</span>
                {step.completed && (
                  <CheckCircle size={20} className="text-green-600" />
                )}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{step.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{step.description}</p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStepComplete(step.id);
                  if (onStepClick) onStepClick(step);
                }}
                variant="primary"
                className="w-full"
                disabled={step.completed}
              >
                {step.completed ? "✓ Completed" : "Start"}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const activeStep = steps[currentStep];

  return (
    <Card className="p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">
          Step {currentStep + 1} of {steps.length}
        </span>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1 mb-6">
        <div
          className="bg-primary-600 h-1 rounded-full transition-all"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Current Step */}
      <div className="text-center mb-6">
        <div className="text-5xl mb-4">{activeStep.icon}</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {activeStep.title}
        </h3>
        <p className="text-gray-600">{activeStep.description}</p>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button
          onClick={() => {
            handleStepComplete(activeStep.id);
            if (onStepClick) onStepClick(activeStep);
          }}
          variant="primary"
          className="w-full flex items-center justify-center gap-2"
        >
          Explore <ChevronRight size={18} />
        </Button>
        <button
          onClick={() => setShowAll(true)}
          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          View All Steps
        </button>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
        >
          Skip Tour
        </button>
      </div>
    </Card>
  );
};
