import React from "react";
import { Chart } from "react-google-charts";

function daysToMilliseconds(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

const rows = [
  [
    "Research",
    "Find sources",
    new Date("2025-06-30 17:30:33"),
    new Date("2025-06-30 18:30:33"),
    null,
    100,
    null,
  ],
  [
    "Write",
    "Write paper",
    new Date("2025-06-30 18:30:34"),
    new Date("2025-06-30 19:30:33"),
    daysToMilliseconds(3),
    100,
    "",
  ],
  [
    "Cite",
    "Create bibliography",
    new Date("2025-06-30 19:30:34"),
    new Date("2025-06-30 20:30:33"),
    daysToMilliseconds(1),
    100,
    "",
  ],
  [
    "Complete",
    "Hand in paper",
    new Date("2025-06-30 20:30:34"),
    new Date("2025-06-30 21:30:33"),
    daysToMilliseconds(1),
    100,
    "",
  ],
  [
    "Outline",
    "Outline paper",
    new Date("2025-06-30 21:30:34"),
    new Date("2025-06-30 22:30:33"),
    daysToMilliseconds(1),
    100,
    "",
  ],
];

export const data = [columns, ...rows];

export function GoogleGantt() {
  return <Chart chartType="Gantt" width="100%" height="100%" data={data} />;
}
