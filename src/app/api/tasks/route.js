import { NextResponse } from "next/server";
import { taskSchema } from "@api/schemas/taskSchema";
import { readTasks, writeTasks } from "@api/utils/db";
import crypto from "crypto";

// Function to generate taskId
function generateTaskId(createdAt) {
  return crypto.createHash("sha1").update(createdAt).digest("hex");
}

// Combined GET handler for fetching all tasks or searching tasks
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    const tasks = await readTasks();

    if (q) {
      const filteredTasks = tasks.filter(
        (task) =>
          task.taskName.toLowerCase().includes(q.toLowerCase()) ||
          task.taskDescription.toLowerCase().includes(q.toLowerCase())
      );

      return NextResponse.json(filteredTasks, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.json(tasks, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tasks." },
      { status: 500 }
    );
  }
}

// Add a new task
export async function POST(req) {
  try {
    const formData = await req.formData();
    const body = {};
    formData.forEach((value, key) => {
      body[key] = value;
    });

    body.taskPriority = body.taskPriority || "Low";
    body.taskStatus = body.taskStatus || "To Do";

    const parsedTask = taskSchema.parse(body);

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const taskId = generateTaskId(createdAt);

    const newTask = {
      _id: taskId,
      ...parsedTask,
      createdAt,
      updatedAt,
    };

    const tasks = await readTasks();
    tasks.push(newTask);

    await writeTasks(tasks);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error adding task." }, { status: 400 });
  }
}
