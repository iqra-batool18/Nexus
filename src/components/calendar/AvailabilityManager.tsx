import React, { useState } from "react";
import { AvailabilitySlot } from "../../types/calendar";
import { Trash2, Plus } from "lucide-react";
import { Button } from "../ui/Button";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface AvailabilityManagerProps {
  slots: AvailabilitySlot[];
  onAdd?: (slot: Omit<AvailabilitySlot, "id">) => void;
  onDelete?: (slotId: string) => void;
  editable?: boolean;
}

export const AvailabilityManager: React.FC<AvailabilityManagerProps> = ({
  slots,
  onAdd,
  onDelete,
  editable = true,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "17:00",
    timezone: "UTC",
  });

  const handleAddSlot = () => {
    if (onAdd) {
      onAdd({
        userId: "",
        ...formData,
      });
      setFormData({
        dayOfWeek: 1,
        startTime: "09:00",
        endTime: "17:00",
        timezone: "UTC",
      });
      setShowForm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Availability Slots
        </h3>
        {editable && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
          >
            <Plus size={18} />
            Add Slot
          </button>
        )}
      </div>

      {showForm && editable && (
        <div className="mb-4 p-4 bg-gray-50 rounded border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day
              </label>
              <select
                value={formData.dayOfWeek}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dayOfWeek: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {DAYS.map((day, idx) => (
                  <option key={idx} value={idx}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timezone
              </label>
              <select
                value={formData.timezone}
                onChange={(e) =>
                  setFormData({ ...formData, timezone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option>UTC</option>
                <option>EST</option>
                <option>CST</option>
                <option>MST</option>
                <option>PST</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleAddSlot}
              variant="primary"
              className="flex-1"
            >
              Add Availability
            </Button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {slots.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No availability slots set
          </p>
        ) : (
          slots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-800">
                  {DAYS[slot.dayOfWeek]}
                </div>
                <div className="text-sm text-gray-600">
                  {slot.startTime} - {slot.endTime} ({slot.timezone})
                </div>
              </div>
              {editable && onDelete && (
                <button
                  onClick={() => onDelete(slot.id)}
                  className="text-red-600 hover:text-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
