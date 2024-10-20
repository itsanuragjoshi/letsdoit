"use client";
import { useState, useEffect } from "react";
import TaskModal from "@app/components/TaskModal";
import ConfirmDeleteModal from "@app/components/ConfirmDeleteModal";
import Table from "@app/components/Table";
import { priorityOptions, statusOptions } from "@app/components/taskOptions";
import { Button } from "@app/components/Button";
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
  const [taskToDelete, setTaskToDelete] = useState(null); // Task ID for deletion

  // Fetch tasks from API with error handling
  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Call fetchTasks when component mounts
  }, []);

  const handleOpenModal = (task = null) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditTask(null);
  };

  const handleEdit = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`); // Fetch task details by ID
      if (!res.ok) {
        throw new Error("Failed to fetch task");
      }
      const taskToEdit = await res.json(); // Get task details
      handleOpenModal(taskToEdit); // Open the modal with the fetched task
    } catch (error) {
      console.error("Error fetching task for edit:", error);
    }
  };

  // New handleDelete function
  const handleDelete = async (taskId) => {
    await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
    });
    fetchTasks(); // Call fetchTasks to update the task list
  };

  // Confirm Delete Modal functions
  const openDeleteModal = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      await handleDelete(taskToDelete._id);
      closeDeleteModal();
    }
  };

  const priorityOrder = {
    Urgent: 1,
    High: 2,
    Normal: 3,
    Low: 4,
  };

  // Sorting function by priority
  const sortByPriority = (tasks) => {
    return tasks.sort((a, b) => {
      return (
        (priorityOrder[a.taskPriority] || 5) -
        (priorityOrder[b.taskPriority] || 5)
      );
    });
  };

  const formatData = (tasks) =>
    tasks.map(({ _id, taskName, taskPriority, taskStatus }) => {
      const priorityOption = priorityOptions.find(
        (option) => option.value === taskPriority
      );
      const statusOption = statusOptions.find(
        (option) => option.value === taskStatus
      );

      return {
        Name: { value: taskName },
        Priority: { value: <PriorityComponent option={priorityOption} /> },
        Status: { value: <StatusComponent option={statusOption} /> },
        Actions: {
          value: (
            <ActionComponent
              id={_id}
              taskName={taskName}
              onEdit={handleEdit}
              onDelete={openDeleteModal}
            />
          ),
        },
      };
    });

  // Filter tasks by status and sort them by priority
  const tasksByStatus = {
    todo: sortByPriority(tasks.filter((task) => task.taskStatus === "To Do")),
    inProgress: sortByPriority(
      tasks.filter((task) => task.taskStatus === "In Progress")
    ),
    completed: sortByPriority(
      tasks.filter((task) => task.taskStatus === "Completed")
    ),
  };

  const getStatusIcon = (status) => {
    const statusOption = statusOptions.find(
      (option) => option.value === status
    );
    return statusOption?.icon || null;
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex flex-1 flex-col gap-6 border border-gray-600 rounded-md p-3 bg-white box-border ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">All Tasks</h1>
          <Button
            variant="solid"
            size="medium"
            icon={PlusIcon}
            showIcon
            showText
            onClick={() => handleOpenModal()}
            aria-label="Add Task"
            title="Add Task"
            text="Add Task"
          />
        </div>
        {/* Table for To Do tasks */}
        {tasksByStatus.todo.length > 0 && (
          <div>
            <div className="flex items-center gap-1 text-lg uppercase font-semibold">
              {getStatusIcon("To Do")} <span>To Do</span>
            </div>
            <Table data={formatData(tasksByStatus.todo)} />
          </div>
        )}

        {/* Table for In Progress tasks */}
        {tasksByStatus.inProgress.length > 0 && (
          <div>
            <div className="flex items-center gap-1 text-lg uppercase font-semibold">
              {getStatusIcon("In Progress")}
              <span>In Progress</span>
            </div>
            <Table data={formatData(tasksByStatus.inProgress)} />
          </div>
        )}

        {/* Table for Completed tasks */}
        {tasksByStatus.completed.length > 0 && (
          <div>
            <div className="flex items-center gap-1 text-lg uppercase font-semibold">
              {getStatusIcon("Completed")}
              <span>Completed</span>
            </div>
            <Table data={formatData(tasksByStatus.completed)} />
          </div>
        )}
      </div>

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          task={editTask}
          onTaskUpdated={fetchTasks}
        />
      )}
      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={confirmDelete}
        taskName={taskToDelete ? taskToDelete.taskName : ""}
      />
    </div>
  );
}

// Reusable Component for Task Priority
const PriorityComponent = ({ option }) => (
  <div className="flex items-center gap-1">
    {option?.icon}
    <span>{option?.value}</span>
  </div>
);

// Reusable Component for Task Status
const StatusComponent = ({ option }) => (
  <div className="flex items-center gap-1">
    {option?.icon}
    <span>{option?.value}</span>
  </div>
);

// Reusable Component for Action Buttons
const ActionComponent = ({ id, taskName, onEdit, onDelete }) => (
  <div>
    <Button
      variant="link"
      size="small"
      icon={PencilIcon}
      showText={false}
      onClick={() => onEdit(id)} // Use the passed onEdit function
      aria-label="Edit"
      title="Edit"
      text="Edit"
    />
    <Button
      variant="link"
      size="small"
      icon={Trash2Icon}
      showText={false}
      onClick={() => onDelete({ _id: id, taskName })} // Pass task ID and name to delete
      aria-label="Delete"
      title="Delete"
      text="Delete"
    />
  </div>
);
