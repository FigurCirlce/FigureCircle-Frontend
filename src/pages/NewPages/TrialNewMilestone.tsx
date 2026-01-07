import React, { ReactNode, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Circle,
  // Edit3,
  // GripVertical,
  // Lock,
  // Plus,
  ShieldAlert,
  // Trash2,
  // User,
  LucideIcon,
} from "lucide-react";

/* ===================== Utils ===================== */

const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

export const STATUS = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  BLOCKED: "Blocked",
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

/* ===================== Types ===================== */

interface Milestone {
  id: string;
  title: string;
  description?: string;
  outcome?: string;
  due?: string;
  status: Status;
  completedOn?: string;
}

interface StatusStyle {
  dot: string;
  pill: string;
  card: string;
  icon: LucideIcon;
}

/* ===================== Styles ===================== */

const statusStyles: Record<Status, StatusStyle> = {
  [STATUS.NOT_STARTED]: {
    dot: "bg-slate-400",
    pill: "bg-slate-100 text-slate-700 border-slate-200",
    card: "bg-white",
    icon: Circle,
  },
  [STATUS.IN_PROGRESS]: {
    dot: "bg-blue-500",
    pill: "bg-blue-50 text-blue-700 border-blue-200",
    card: "bg-white",
    icon: Circle,
  },
  [STATUS.COMPLETED]: {
    dot: "bg-emerald-500",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    card: "bg-emerald-50/60",
    icon: CheckCircle2,
  },
  [STATUS.BLOCKED]: {
    dot: "bg-red-500",
    pill: "bg-red-50 text-red-700 border-red-200",
    card: "bg-white",
    icon: ShieldAlert,
  },
};

/* ===================== Helpers ===================== */

const formatDate = (d?: string): string => {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return d;
  }
};

const prettyDue = (d?: string): string => {
  if (!d) return "";
  try {
    return new Date(d).toISOString().slice(0, 10);
  } catch {
    return d;
  }
};

const initialMilestones: Milestone[] = [];

/* ===================== Main ===================== */

const MilestoneRoadmapPreview: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [title, setTitle] = useState("");
  const [outcome, setOutcome] = useState("");
  const [due, setDue] = useState("");
  const [description, setDescription] = useState("");
  //@ts-ignore
  const [showDetails, setShowDetails] = useState(false);

  const visibleMilestones = useMemo(() => {
    return [...milestones].sort((a, b) => {
      const aw = a.status === STATUS.COMPLETED ? 0 : 1;
      const bw = b.status === STATUS.COMPLETED ? 0 : 1;
      if (aw !== bw) return aw - bw;
      return String(a.due ?? "").localeCompare(String(b.due ?? ""));
    });
  }, [milestones]);

  const resetForm = () => {
    setTitle("");
    setOutcome("");
    setDue("");
    setDescription("");
    setShowDetails(false);
  };

  const addMilestone = () => {
    if (!title.trim()) return;

    const newItem: Milestone = {
      id: `m_${crypto.randomUUID()}`,
      title: title.trim(),
      description: description.trim(),
      outcome: outcome.trim(),
      due,
      status: STATUS.NOT_STARTED,
    };

    setMilestones((prev) => [newItem, ...prev]);
    resetForm();
  };

  const cycleStatus = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;

        const next: Status =
          m.status === STATUS.NOT_STARTED
            ? STATUS.IN_PROGRESS
            : m.status === STATUS.IN_PROGRESS
            ? STATUS.COMPLETED
            : m.status === STATUS.COMPLETED
            ? STATUS.BLOCKED
            : STATUS.NOT_STARTED;

        return {
          ...m,
          status: next,
          completedOn:
            next === STATUS.COMPLETED
              ? new Date().toISOString().slice(0, 10)
              : undefined,
        };
      })
    );
  };

  const removeMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-slate-900">
          Milestone Roadmap
        </h1>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
          {/* LEFT */}
          <div className="rounded-2xl bg-white p-5 shadow border">
            <h2 className="font-semibold mb-4">Add milestone</h2>

            <Field label="Milestone title" required>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-10 w-full rounded-xl border px-3"
              />
            </Field>

            <Field label="Outcome">
              <input
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className="h-10 w-full rounded-xl border px-3"
              />
            </Field>

            <Field label="Due date">
              <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="h-10 w-full rounded-xl border px-3"
              />
            </Field>

            <button
              onClick={addMilestone}
              className="mt-4 w-full rounded-xl bg-indigo-600 py-2 text-white font-semibold"
            >
              Add to roadmap
            </button>
          </div>

          {/* RIGHT */}
          <div className="rounded-2xl bg-white p-5 shadow border">
            <AnimatePresence>
              {visibleMilestones.map((m) => (
                <motion.div
                  key={m.id}
                  layout
                  className="mb-4"
                >
                  <MilestoneCard
                    milestone={m}
                    onCycle={() => cycleStatus(m.id)}
                    onDelete={() => removeMilestone(m.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneRoadmapPreview;

/* ===================== Components ===================== */

interface FieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, required, children }) => (
  <div className="mb-3">
    <label className="text-xs font-semibold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="mt-1">{children}</div>
  </div>
);

interface MilestoneCardProps {
  milestone: Milestone;
  onCycle: () => void;
  onDelete: () => void;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestone,
  onCycle,
  onDelete,
}) => {
  const s = statusStyles[milestone.status];
  const StatusIcon = s.icon;

  return (
    <div className={cx("rounded-xl border p-4", s.card)}>
      <h3 className="font-semibold">{milestone.title}</h3>

      <p className="text-sm text-slate-600">
        {milestone.description || "—"}
      </p>

      <div className="mt-3 flex gap-2">
        <span className={cx("rounded-full border px-2 py-1 text-xs", s.pill)}>
          <StatusIcon className="inline h-3 w-3 mr-1" />
          {milestone.status}
        </span>

        {milestone.due && (
          <span className="rounded-full border px-2 py-1 text-xs">
            <Calendar className="inline h-3 w-3 mr-1" />
            {formatDate(milestone.due)}
          </span>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={onCycle}
          className="rounded bg-slate-900 px-3 py-1 text-xs text-white"
        >
          Cycle
        </button>
        <button
          onClick={onDelete}
          className="rounded border px-3 py-1 text-xs text-red-600"
        >
          Delete
        </button>
      </div>

      <div className="mt-2 text-[11px] text-slate-400">
        ID: {milestone.id} · due: {prettyDue(milestone.due)}
      </div>
    </div>
  );
};
