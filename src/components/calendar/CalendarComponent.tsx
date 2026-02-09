import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Meeting } from "../../types/calendar";

interface CalendarComponentProps {
  meetings: Meeting[];
  onDateSelect?: (date: Date) => void;
  onMeetingClick?: (meeting: Meeting) => void;
}

export const CalendarComponent: React.FC<CalendarComponentProps> = ({
  meetings,
  onDateSelect,
  onMeetingClick,
}) => {
  const [currentView, setCurrentView] = useState<
    "dayGridMonth" | "timeGridWeek" | "timeGridDay"
  >("dayGridMonth");

  const events = meetings.map((meeting) => ({
    id: meeting.id,
    title: meeting.title,
    start: meeting.startTime,
    end: meeting.endTime,
    backgroundColor: meeting.status === "completed" ? "#10B981" : "#3B82F6",
    borderColor: meeting.status === "completed" ? "#059669" : "#2563EB",
    extendedProps: {
      meeting,
    },
  }));

  const handleDateSelect = (selectInfo: { startStr: string }) => {
    if (onDateSelect) {
      onDateSelect(new Date(selectInfo.startStr));
    }
  };

  const handleEventClick = (clickInfo: {
    event: { extendedProps: { meeting: Meeting } };
  }) => {
    if (onMeetingClick) {
      onMeetingClick(clickInfo.event.extendedProps.meeting);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setCurrentView("dayGridMonth")}
          className={`px-4 py-2 rounded text-sm font-medium transition ${
            currentView === "dayGridMonth"
              ? "bg-primary-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Month
        </button>
        <button
          onClick={() => setCurrentView("timeGridWeek")}
          className={`px-4 py-2 rounded text-sm font-medium transition ${
            currentView === "timeGridWeek"
              ? "bg-primary-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setCurrentView("timeGridDay")}
          className={`px-4 py-2 rounded text-sm font-medium transition ${
            currentView === "timeGridDay"
              ? "bg-primary-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Day
        </button>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={currentView}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        events={events}
        eventClick={handleEventClick}
        select={handleDateSelect}
        selectable={true}
        height="auto"
        contentHeight="auto"
        eventClassNames="cursor-pointer hover:opacity-80 transition"
      />
    </div>
  );
};
