import { z } from "zod";

export const taskSchema = z.object({
  taskName: z
    .string()
    .min(3, "Task title must be at least 3 characters long")
    .max(100, "Task title must be less than 100 characters long"),

  taskDescription: z.string().optional(),

  taskPriority: z
    .enum(["Urgent", "High", "Normal", "Low"], "Invalid task priority")
    .default("Low"),

  taskStatus: z
    .enum(["To Do", "In Progress", "Completed"], "Invalid task status")
    .default("To Do"),
});
