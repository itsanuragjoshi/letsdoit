**LetsDoIt - Task Management App**

**Overview**

The Task Management App is a simple yet effective tool for managing tasks and improving productivity. Users can create, edit, and delete tasks, as well as prioritize them based on urgency or importance. The app provides an intuitive interface, making it easy to keep track of tasks and their statuses.

**Key Features**

-   Create, edit, and delete tasks.
-   Prioritize tasks by assigning different levels of urgency.
-   Filter and sort tasks based on priority.
-   User-friendly interface built with React and TipTap for rich text editing.

**Technologies Used**

-   **Frontend**: Next.js, TipTap
-   **Backend**: Next.js, `fs` (File System) module for API
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide Icons

**Getting Started**

To set up the project locally, follow these steps:

**Prerequisites**

Make sure you have the following installed:

-   Node.js (version 14 or above)
-   npm (Node Package Manager)

**Installation**

1.  **Clone the repository**:

```
git clone https://github.com/itsanuragjoshi/letsdoit.git

cd letsdoit
```


**Install dependencies**:

```npm install```

**Run the application**:

```npm run dev```

***Open your browser and go to http://localhost:3000***

**Usage**
Once the application is running, you can:

-   Add a new task by entering the task details and clicking the "Add Task" button.
-   Edit an existing task by clicking on it and modifying the content.
-   Delete a task by clicking the "Delete" button next to it.
-   Set the priority (Urgent, High, Normal, Low) and status (To Do, In Progress, Completed) of each task, which will affect how they are sorted in the list.


### Database and API

The application uses a local JSON file (`data/db.json`) to simulate a database. This file stores the task data, enabling the app to persist information across sessions.

### CRUD API

The app utilizes Next.js's API routes, along with the `fs` (File System) module, to create a simple CRUD API for managing tasks. The following functionalities are provided:

-   **Create**: Add new tasks to the database.
-   **Read**: Retrieve the list of tasks from the database.
-   **Update**: Modify existing tasks.
-   **Delete**: Remove tasks from the database.

This setup allows for efficient task management and data persistence using a straightforward file-based approach.

**Sorting Tasks by Priority**

Tasks can be sorted based on their priority levels. The approach taken for sorting involves the following:

1.  **Priority Levels**: Each task can be assigned a priority level (e.g., High, Medium, Low). This is done through the UI when creating or editing a task.
2.  **Sorting Logic**: When displaying the task list, tasks are first grouped by their status and then sorted by their priority levels. The sorting algorithm categorizes tasks based on their assigned priority, ensuring that high-priority tasks appear at the top of the list.
3.  **Dynamic Updates**: Whenever a task's priority is changed, the list automatically re-renders to reflect the new order.

**Example of Sorting Logic**

Here's a simple example of how tasks might be sorted based on their priority levels:

```
const sortedTasks = tasks.sort((a, b) => {
 const priorityOrder = { high: 1, medium: 2, low: 3 };
 return priorityOrder[a.priority] - priorityOrder[b.priority];
});
```