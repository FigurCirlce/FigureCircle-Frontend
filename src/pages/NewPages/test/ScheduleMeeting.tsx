import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Video,
  Target,
  ClipboardList,
  MessageSquare,
  Bell,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import Divider from "@mui/material/Divider";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

type Meeting = {
  id: string;
  mentorName: string;
  whenLabel: string;
  duration: string;
};

const SAMPLE_MEETINGS: Meeting[] = [
  {
    id: "mt1",
    mentorName: "harshteacher38",
    whenLabel: "Feb 23, 2026 • 10:00 AM",
    duration: "60 minutes",
  },
];

export default function ScheduleMeetingPage() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(23);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const monthLabel = useMemo(() => {
    const base = new Date(2026, 1, 1); // Feb 2026
    base.setMonth(base.getMonth() + monthOffset);
    return base.toLocaleString(undefined, { month: "long", year: "numeric" });
  }, [monthOffset]);

  const times = useMemo(() => {
    if (!selectedDay) return [];
    return ["9:00 AM", "10:00 AM", "12:30 PM", "3:00 PM", "6:30 PM"];
  }, [selectedDay]);

  const ctaEnabled = !!selectedDay && !!selectedTime;

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Schedule meeting</h1>
          <p className="text-sm text-muted-foreground mt-1">Select date → time → book.</p>
        </div>

        <div className="mt-6 grid gap-4">
          <div className="grid lg:grid-cols-2 gap-4 items-stretch">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{monthLabel}</CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">Pick a date</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => {
                        setMonthOffset((x) => x - 1);
                        setSelectedTime(null);
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => {
                        setMonthOffset((x) => x + 1);
                        setSelectedTime(null);
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CalendarGrid
                  selectedDay={selectedDay}
                  onSelectDay={(d) => {
                    setSelectedDay(d);
                    setSelectedTime(null);
                  }}
                />
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Available times</CardTitle>
                  
                </div>
              </CardHeader>
              <CardContent className="flex h-full flex-col gap-3">
                {!selectedDay ? (
                  <div className="rounded-xl border border-dashed p-6 text-center">
                    <div className="font-medium">Pick a date</div>
                    <div className="text-sm text-muted-foreground mt-1">Times will show here.</div>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-2 flex-1 max-h-[260px] overflow-auto pr-1">
                      {times.map((t) => {
                        const isSelected = selectedTime === t;
                        return (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={cn(
                              "w-full text-left rounded-xl border px-3 py-2 transition",
                              isSelected
                  ? "bg-gray-900 text-white"
                                : "bg-white hover:bg-gray-100"
                            )}
                          >
                            <div className="text-sm font-medium">{t}</div>
                            <div
                              className={cn(
                                "text-[11px] mt-0.5",
                                isSelected ? "text-white/80" : "text-muted-foreground"
                              )}
                            >
                              with your assigned expert
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <Divider/>

                    <div className="pt-1">
                      <Button className="rounded-full bg-gray-900 hover:bg-gray-800 text-white" disabled={!ctaEnabled}>
                        Book meeting
                      </Button>
                      <div className="text-xs text-muted-foreground mt-2">
                        {ctaEnabled
                          ? `Booking: ${monthLabel.split(" ")[0]} ${selectedDay} • ${selectedTime}`
                          : "Select a time to enable booking."}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Scheduled meetings</CardTitle>
              <div className="text-sm text-muted-foreground mt-1">Your upcoming call(s).</div>
            </CardHeader>
            <CardContent className="grid gap-3">
              {SAMPLE_MEETINGS.map((m) => (
                <div key={m.id} className="rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="font-medium">{m.mentorName}</div>
                    <div className="text-sm text-muted-foreground mt-1">{m.whenLabel}</div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button className="rounded-full bg-gray-900 hover:bg-gray-800 text-white" size="sm">
                      <Video className="h-4 w-4 mr-2" /> Join
                    </Button>
                    <Button variant="outline" className="rounded-full" size="sm">
                      <Target className="h-4 w-4 mr-2" /> Intent
                    </Button>
                    <Button variant="outline" className="rounded-full" size="sm">
                      <ClipboardList className="h-4 w-4 mr-2" /> Milestones
                    </Button>
                    <Button variant="outline" className="rounded-full" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" /> Feedback
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg border bg-muted/60 grid place-items-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold">FigureCircle</div>
            <div className="text-xs text-muted-foreground">Schedule Meeting</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 rounded-full bg-muted/60 p-1 border">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-background shadow border text-sm">
              <CalendarDays className="h-4 w-4" />
              Schedule Meeting
            </div>
          </div>
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </Button>
          <Button className="rounded-full">
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}

function CalendarGrid({
  selectedDay,
  onSelectDay,
}: {
  selectedDay: number | null;
  onSelectDay: (d: number) => void;
}) {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const week = ["S", "M", "T", "W", "T", "F", "S"];
  const available = new Set([4, 6, 10, 14, 18, 23, 25, 27]);

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 text-xs text-muted-foreground mb-2">
        {week.map((w) => (
          <div key={w} className="text-center">{w}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => {
          const isSelected = d === selectedDay;
          const isAvailable = available.has(d);
          return (
            <button
              key={d}
              onClick={() => onSelectDay(d)}
              className={cn(
                "h-10 rounded-xl border text-sm transition",
                isSelected
                  ? "bg-gray-900 text-white"
                  : "bg-background hover:bg-gray-100",
                !isAvailable && !isSelected ? "opacity-50" : ""
              )}
              aria-label={`Select day ${d}`}
            >
              {d}
            </button>
          );
        })}
      </div>

      <div className="mt-3 text-xs text-muted-foreground">
        Available dates are slightly dimmed vs unavailable.
      </div>
    </div>
  );
}
