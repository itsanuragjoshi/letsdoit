import { NextResponse } from "next/server";
import { taskSchema } from "@api/schemas/taskSchema";
import { readTasks, writeTasks } from "@api/utils/db";

// Fetch task by ID
export async function GET(request, { params }) {
  try {
    const { taskId } = params;
    const tasks = await readTasks();
    const task = tasks.find((task) => task._id === taskId);

    if (task) {
      return NextResponse.json(task);
    } else {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching task." },
      { status: 500 }
    );
  }
}

// Update task by ID
export async function PUT(request, { params }) {
  try {
    const { taskId } = params;

    const formData = await request.formData();
    const body = {};
    formData.forEach((value, key) => {
      body[key] = value;
    });

    taskSchema.parse(body);

    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((task) => task._id === taskId);

    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const updatedAt = new Date().toISOString();
    const updatedTask = {
      ...tasks[taskIndex],
      ...body,
      updatedAt,
    };

    tasks[taskIndex] = updatedTask;

    await writeTasks(tasks);

    return NextResponse.json(
      { message: "Task updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Error updating task.` },
      { status: 500 }
    );
  }
}

// Delete task by ID
export async function DELETE(request, { params }) {
  try {
    const { taskId } = params;
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((task) => task._id == taskId);

    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    tasks.splice(taskIndex, 1);

    await writeTasks(tasks);
    return NextResponse.json(
      { message: "Task deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting task." },
      { status: 500 }
    );
  }
}
