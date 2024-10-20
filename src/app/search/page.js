"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Use this to get query params

const Search = () => {
  const searchParams = useSearchParams(); // Access search params
  const q = searchParams.get("q"); // Get the "q" parameter from the URL
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks based on the search query
  useEffect(() => {
    const fetchTasks = async () => {
      if (!q) return; // If there's no query, don't fetch
      setLoading(true);

      try {
        const res = await fetch(`/api/tasks?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [q]); // Trigger when "q" changes

  return (
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mt-4">Results for "{q}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="p-4 border-b border-gray-300">
                <h3 className="text-lg font-semibold">{task.taskName}</h3>
                <p>{task.taskDescription}</p>
              </div>
            ))
          ) : (
            <p>Oops! No tasks matched your search query.</p>
          )}
        </div>
      )}
    </main>
  );
};

export default Search;
