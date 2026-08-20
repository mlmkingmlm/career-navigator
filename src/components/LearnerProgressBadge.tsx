type ProgressState = "default" | "in-progress" | "completed" | "disabled";

interface LearnerProgressBadgeProps {
  state?: ProgressState;
}

const stateStyles: Record<
  ProgressState,
  {
    label: string;
    className: string;
  }
> = {
  default: {
    label: "Not Started",
    className:
      "bg-white border-[#172554] text-[#172554]",
  },

  "in-progress": {
    label: "In Progress",
    className:
      "bg-[#38BDF8] border-[#38BDF8] text-[#172554]",
  },

  completed: {
    label: "Completed",
    className:
      "bg-[#DCFCE7] border-[#22C55E] text-[#166534]",
  },

  disabled: {
    label: "Disabled",
    className:
      "bg-[#F1F5F9] border-[#CBD5E1] text-[#94A3B8]",
  },
};

const LearnerProgressBadge = ({
  state = "default",
}: LearnerProgressBadgeProps) => {
  const { label, className } = stateStyles[state];

  return (
    <span
      className={`inline-flex h-10 w-[140px] items-center justify-center rounded-full border text-sm font-medium ${className}`}
      aria-disabled={state === "disabled"}
    >
      {label}
    </span>
  );
};

export default LearnerProgressBadge;