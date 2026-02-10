import React, { useState } from "react";
import { CalendarComponent } from "../../components/calendar/CalendarComponent";
import { AvailabilityManager } from "../../components/calendar/AvailabilityManager";
import { MeetingRequestCard } from "../../components/calendar/MeetingRequestCard";
import {
  mockMeetings,
  mockAvailabilitySlots,
  mockMeetingRequests,
} from "../../data/meetings";
import {
  Meeting,
  AvailabilitySlot,
  MeetingRequest,
} from "../../types/calendar";
import { Card } from "../../components/ui/Card";
import { Calendar, Clock, Users, Bell } from "lucide-react";

export const CalendarPage: React.FC = () => {
  const [meetings] = useState<Meeting[]>(mockMeetings);
  const [availabilitySlots, setAvailabilitySlots] = useState<
    AvailabilitySlot[]
  >(mockAvailabilitySlots);
  const [meetingRequests, setMeetingRequests] =
    useState<MeetingRequest[]>(mockMeetingRequests);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const handleAddAvailability = (slot: Omit<AvailabilitySlot, "id">) => {
    const newSlot: AvailabilitySlot = {
      ...slot,
      id: `avail-${Date.now()}`,
      userId: "current-user",
    };
    setAvailabilitySlots([...availabilitySlots, newSlot]);
  };

  const handleDeleteAvailability = (slotId: string) => {
    setAvailabilitySlots(availabilitySlots.filter((s) => s.id !== slotId));
  };

  const handleAcceptRequest = (requestId: string) => {
    setMeetingRequests(
      meetingRequests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "accepted" as const,
              respondedAt: new Date().toISOString(),
            }
          : req,
      ),
    );
  };

  const handleDeclineRequest = (requestId: string) => {
    setMeetingRequests(
      meetingRequests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "declined" as const,
              respondedAt: new Date().toISOString(),
            }
          : req,
      ),
    );
  };

  const pendingRequests = meetingRequests.filter((r) => r.status === "pending");
  const upcomingMeetings = meetings.filter((m) => m.status === "scheduled");

  return (
    <div className="max-w-[1600px] mx-auto p-4 lg:p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Schedule
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Overview of your availability and sessions
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-bold text-gray-700">
              {upcomingMeetings.length} Active Meetings
            </span>
          </div>
        </div>
      </div>

      {/* Requests Section */}
      {pendingRequests.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary-600">
            <Bell size={20} />
            <h2 className="font-bold uppercase tracking-wider text-sm">
              Action Required
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingRequests.map((request) => (
              <MeetingRequestCard
                key={request.id}
                request={request}
                initiatorName="John Investor"
                onAccept={handleAcceptRequest}
                onDecline={handleDeclineRequest}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Calendar */}
        <div className="col-span-12 xl:col-span-8 space-y-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <CalendarComponent
              meetings={meetings}
              onMeetingClick={setSelectedMeeting}
            />
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="col-span-12 xl:col-span-4 space-y-8">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-1">
              <AvailabilityManager
                slots={availabilitySlots}
                onAdd={handleAddAvailability}
                onDelete={handleDeleteAvailability}
                editable={true}
              />
            </div>
          </div>

          <Card className="p-0 border-none shadow-md overflow-hidden bg-white">
            <div className="p-6 border-b bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Clock size={20} className="text-primary-500" />
                Up Next
              </h2>
            </div>
            {/* --- Error was here on the line below --- */}
            <div className="p-6 max-h-[400px] overflow-y-auto space-y-4">
              {upcomingMeetings.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="mx-auto text-gray-300 mb-2" size={40} />
                  <p className="text-gray-400 text-sm">
                    Your schedule is clear
                  </p>
                </div>
              ) : (
                upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="group relative p-4 rounded-xl border border-gray-100 bg-white hover:border-primary-200 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => setSelectedMeeting(meeting)}
                  >
                    <div className="absolute left-0 top-4 bottom-4 w-1 bg-primary-500 rounded-r-lg group-hover:w-1.5 transition-all" />
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {meeting.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-3 text-xs font-semibold text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(meeting.startTime).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(meeting.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Meeting Details Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {selectedMeeting.meetingType}
                </span>
                <h2 className="text-3xl font-black text-gray-900 mt-2">
                  {selectedMeeting.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedMeeting(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {selectedMeeting.description && (
                <p className="text-gray-600 leading-relaxed border-l-4 border-gray-200 pl-4">
                  {selectedMeeting.description}
                </p>
              )}

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Date & Time
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(selectedMeeting.startTime).toLocaleString()}
                  </p>
                </div>
                {selectedMeeting.location && (
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 font-bold uppercase">
                      Location
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedMeeting.location}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedMeeting(null)}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg"
              >
                Done
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
