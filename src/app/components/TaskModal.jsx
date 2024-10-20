"use client";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "./Button";
import { MultilineInput } from "./MultilineInput";
import { SinglelineInput } from "./SinglelineInput";
import { SelectElement } from "./SelectElement";
import { priorityOptions, statusOptions } from "./taskOptions";

export default function TaskModal({ isOpen, onClose, task, onTaskUpdated }) {
  const [taskName, setTaskName] = useState(task?.taskName || "");
  const [taskDescription, setTaskDescription] = useState(
    task?.taskDescription || ""
  );
  const [taskPriority, setTaskPriority] = useState(task?.taskPriority || "Low");
  const [taskStatus, setTaskStatus] = useState(task?.taskStatus || "To Do");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("taskName", taskName);
    formData.append("taskDescription", taskDescription);
    formData.append("taskPriority", taskPriority);
    formData.append("taskStatus", taskStatus);

    if (task) {
      await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        body: formData,
      });
    } else {
      await fetch("/api/tasks", {
        method: "POST",
        body: formData,
      });
    }
    onTaskUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-black bg-opacity-50">
      <div className="bg-gray-200 rounded-lg shadow-lg p-3 max-w-lg w-full">
        <div
          className={`bg-white border border-gray-600 rounded-md px-3 py-4 flex flex-col gap-2 modal ${
            isOpen ? "open" : ""
          }`}
        >
          <div className="flex flex-col gap-2">
            <SinglelineInput
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task Name"
              className="text-xl"
              aria-label="Task Name"
            />
            <MultilineInput
              value={taskDescription}
              onChange={(content) => setTaskDescription(content)}
              placeholder="Description"
              aria-label="Task Description"
            />
            <div className="flex gap-2 items-center">
              <label>Priority</label>
              <SelectElement
                value={taskPriority}
                onChange={(value) => setTaskPriority(value)}
                options={priorityOptions}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label>Status</label>
              <SelectElement
                value={taskStatus}
                onChange={(value) => setTaskStatus(value)}
                options={statusOptions}
              />
            </div>

            <div className="flex gap-2 mt-8">
              <Button
                variant="outline"
                size="medium"
                showIcon={false}
                showText={true}
                onClick={onClose}
                aria-label="Cancel"
                title="Cancel"
                text="Cancel"
              />
              <Button
                variant="solid"
                size="medium"
                icon={PlusIcon}
                showIcon={true}
                showText={true}
                onClick={handleSubmit}
                aria-label={task ? "Update Task" : "Add Task"}
                title={task ? "Update Task" : "Add Task"}
                text={task ? "Update Task" : "Add Task"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
