export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export function addTask(tasks: Task[], title: string): Task[] {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    throw new Error("Enter a task before adding it.");
  }

  const nextId = tasks.reduce((largestId, task) => Math.max(largestId, task.id), 0) + 1;
  return [...tasks, { id: nextId, title: trimmedTitle, status: "todo" }];
}

export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, status: "done" } : task,
  );
}

export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) => {
    if (task.id !== id || task.status === "done") {
      return task;
    }

    return {
      ...task,
      status: task.status === "todo" ? "in-progress" : "done",
    };
  });
}

export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status);
}
