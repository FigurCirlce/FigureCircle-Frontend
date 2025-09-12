import { useState } from "react";

interface Availability{
  day: string;
  startTime: string;
  endTime: string;
};


const dayMap: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function formatDateLocal(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`; // YYYY-MM-DD
}


function generateTimeSlots(start: string, end: string) {
  const slots: { start: string; end: string }[] = [];
  let [startH, startM] = start.split(":").map(Number);
  let [endH, endM] = end.split(":").map(Number);

  while (startH < endH || (startH === endH && startM < endM)) {
    let nextH = startH;
    let nextM = startM + 60;
    if (nextM >= 60) {
      nextM = 0;
      nextH++;
    }

    slots.push({
      start: `${String(startH).padStart(2, "0")}:${String(startM).padStart(2, "0")}`,
      end: `${String(nextH).padStart(2, "0")}:${String(nextM).padStart(2, "0")}`,
    });

    startH = nextH;
    startM = nextM;
  }
  return slots;
}

export default function CustomCalendar({
  onSelect,availability
}: {
  onSelect: (slot: any) => void;
  availability?: Availability[];
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const availableDayNumbers = availability?.map((a) => dayMap[a.day]);

  return (
    <div className="p-4">
      <h2 className="text-center font-semibold mb-4">
        {today.toLocaleString("default", { month: "long" })} {year}
      </h2>

      <div className="grid grid-cols-7 gap-2 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="font-semibold">
            {d}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);
          const weekday = date.getDay();
          const isAvailable = availableDayNumbers?.includes(weekday);

          return (
            <button
              key={day}
              onClick={() => isAvailable && setSelectedDate(date)}
              className={`p-2 rounded-lg ${
                isAvailable
                  ? "bg-blue-100 hover:bg-blue-300"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="mt-6">
          <h3 className="font-semibold text-center mb-2">
            Available Slots for{" "}
            {selectedDate.toLocaleDateString("default", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </h3>
          {availability
            ?.filter((a) => dayMap[a.day] === selectedDate.getDay())
            .map((slot, idx) => {
              const slots = generateTimeSlots(slot.startTime, slot.endTime);
              return (
                <div key={idx} className="flex flex-wrap gap-2 justify-center">
                  {slots.map((t, i) => (
                    <button
                      key={i}
                      className="px-3 py-1 rounded-full border bg-gray-100 hover:bg-blue-200"
                      onClick={() =>
                        onSelect({
                        //   date: selectedDate.toISOString().split("T")[0],
                         date: formatDateLocal(selectedDate),
                          start: t.start,
                          end: t.end,
                        })
                      }
                    >
                      {t.start} - {t.end}
                    </button>
                  ))}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
