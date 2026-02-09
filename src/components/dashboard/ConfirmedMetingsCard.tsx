import React from "react";
import { Calendar, MapPin, Clock, ArrowRight, Video } from "lucide-react";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { Meeting } from "../../types/calendar";

interface ConfirmedMeetingsCardProps {
  meetings: Meeting[];
  showViewAll?: boolean;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};

const isUpcoming = (startTime: string): boolean => {
  return new Date(startTime) > new Date();
};

export const ConfirmedMeetingsCard: React.FC<ConfirmedMeetingsCardProps> = ({
  meetings,
  showViewAll = true,
}) => {
  const upcomingMeetings = meetings
    .filter((m) => m.status === "scheduled" && isUpcoming(m.startTime))
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    )
    .slice(0, 3);

  const getMeetingTypeIcon = (type: string) => {
    return type === "video" ? <Video size={16} /> : <MapPin size={16} />;
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Confirmed Meetings
        </h2>
        {showViewAll && (
          <Link
            to="/calendar"
            className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        )}
      </CardHeader>

      <CardBody>
        {upcomingMeetings.length > 0 ? (
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-colors duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {meeting.title}
                    </h3>
                    <Badge variant="success" className="text-xs">
                      {meeting.meetingType === "video" ? "Video" : "In-Person"}
                    </Badge>
                  </div>

                  {meeting.description && (
                    <p className="text-sm text-gray-600 mb-3">
                      {meeting.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-primary-600" />
                      <span>{formatDate(meeting.startTime)}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-primary-600" />
                      <span>
                        {Math.round(
                          (new Date(meeting.endTime).getTime() -
                            new Date(meeting.startTime).getTime()) /
                            60000,
                        )}{" "}
                        min
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {getMeetingTypeIcon(meeting.meetingType)}
                      <span className="capitalize">{meeting.meetingType}</span>
                    </div>
                  </div>
                </div>

                {meeting.meetingType === "video" && (
                  <Link to="/video">
                    <Button size="sm" className="ml-4 whitespace-nowrap">
                      Join Call
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Calendar size={24} className="text-gray-500" />
            </div>
            <p className="text-gray-600 font-medium">No upcoming meetings</p>
            <p className="text-sm text-gray-500 mt-1">
              Schedule a meeting by going to Calendar
            </p>
            <Link to="/calendar" className="mt-3 inline-block">
              <Button size="sm" variant="outline">
                Open Calendar
              </Button>
            </Link>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ConfirmedMeetingsCard;
