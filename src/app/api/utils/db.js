import fs from "fs/promises";
import path from "path";

// Path to DB (db.json file)
const dbPath = path.join(process.cwd(), "data", "db.json");

// Read tasks from DB
export async function readTasks() {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    const jsonData = JSON.parse(data);
    return jsonData.tasks;
  } catch (error) {
    throw new Error("Failed to read tasks");
  }
}

// Write tasks to DB
export async function writeTasks(tasks) {
  try {
    const jsonData = { tasks };
    await fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), "utf-8");
  } catch (error) {
    throw new Error("Failed to write tasks");
  }
}
