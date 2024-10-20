import { FlagIcon, CircleCheckIcon, CircleDot } from "lucide-react";

// Priority options with icons
export const priorityOptions = [
  {
    value: "Urgent",
    label: "Urgent",
    icon: <FlagIcon color="red" fill="red" />,
  },
  {
    value: "High",
    label: "High",
    icon: <FlagIcon color="orange" fill="orange" />,
  },
  {
    value: "Normal",
    label: "Normal",
    icon: <FlagIcon color="blue" fill="blue" />,
  },
  {
    value: "Low",
    label: "Low",
    icon: <FlagIcon color="gray" fill="gray" />,
  },
];

// Status options with icons
export const statusOptions = [
  {
    value: "To Do",
    label: "To Do",
    icon: <CircleDot color="white" fill="gray" />,
  },
  {
    value: "In Progress",
    label: "In Progress",
    icon: <CircleDot color="white" fill="blue" />,
  },
  {
    value: "Completed",
    label: "Completed",
    icon: <CircleCheckIcon color="white" fill="green" />,
  },
];
