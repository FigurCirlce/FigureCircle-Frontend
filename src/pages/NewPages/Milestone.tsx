import React from "react";
import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, Clock } from "lucide-react";
import { BadgeInfo } from "lucide-react";

// Define types
type Milestone = {
  milestone: string;
  description: string;
  expectedCompletionDate: string;
  mentorFees: number;
};

type MilestoneData = {
  check_id: number;
  check_meeting_id: number;
  created_at: string;
  history_count: number;
  latest_milestone: Milestone;
  mentor_id: number;
  serial_number: number;
  user_id: number;
};

interface MilestoneTimelineProps {
  data: MilestoneData;
}

const AvailMilestone: React.FC<MilestoneTimelineProps> = ({ data }) => {
  const {
    serial_number,
    user_id,
    mentor_id,
    check_id,
    check_meeting_id,
    created_at,
    history_count,
    latest_milestone,
  } = data;

  const { milestone, description, expectedCompletionDate, mentorFees } =
    latest_milestone;

  return (
    <Card className="w-full max-w-3xl mx-auto mt-10 rounded-2xl shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">
        Latest Milestone
      </h2>

      <div className="space-y-8">
        <div className="flex items-start gap-4">
          <BadgeInfo className="text-blue-500 mt-1" />
          <div>
            <p className="text-lg font-medium text-gray-800">{milestone}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-600" />
            <span className="font-semibold">
              Due: <span className="">{expectedCompletionDate}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-yellow-600" />
            <span className="font-semibold">
              Mentor Fee:<span className="">${mentorFees}</span>{" "}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="font-semibold">
              Created At:{" "}
              <span className="">{new Date(created_at).toLocaleString()}</span>
            </span>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center gap-2">
            <span className="font-semibold">History Count:</span>
            <span>{history_count}</span>
          </div>
        </div>

        <div className="text-xs text-gray-400 pt-2 border-t mt-4">
          <p>
            Ref IDs - Check ID: {check_id}, Meeting ID: {check_meeting_id},
            User: {user_id}, Mentor: {mentor_id}, Serial: {serial_number}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AvailMilestone;
