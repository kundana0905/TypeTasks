import { addTask, advanceTask, filterByStatus, type Task, type TaskStatus } from "./model.js";

const taskForm = document.getElementById("task-form") as HTMLFormElement;
const taskTitle = document.getElementById("task-title") as HTMLInputElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const emptyState = document.getElementById("empty-state") as HTMLParagraphElement;
const feedback = document.getElementById("feedback") as HTMLParagraphElement;
const filterButtons = document.querySelectorAll<HTMLButtonElement>("[data-status]");

let tasks: Task[] = [];
let activeFilter: TaskStatus | "all" = "all";

function isTaskStatus(value: string): value is TaskStatus {
  return value === "todo" || value === "in-progress" || value === "done";
}

function renderTasks(): void {
  const visibleTasks =
    activeFilter === "all" ? tasks : filterByStatus(tasks, activeFilter);

  taskList.replaceChildren();
  emptyState.hidden = visibleTasks.length > 0;

  for (const task of visibleTasks) {
    const item = document.createElement("li");
    item.className = `task-card task-card--${task.status}`;

    const details = document.createElement("div");
    details.className = "task-details";

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const badge = document.createElement("span");
    badge.className = `status-badge status-badge--${task.status}`;
    badge.textContent = task.status === "in-progress" ? "In progress" : task.status;

    details.append(title, badge);

    const advanceButton = document.createElement("button");
    advanceButton.className = "advance-button";
    advanceButton.type = "button";
    advanceButton.textContent =
      task.status === "todo" ? "Start task" : task.status === "in-progress" ? "Mark done" : "Completed";
    advanceButton.disabled = task.status === "done";
    advanceButton.setAttribute("aria-label", `${advanceButton.textContent}: ${task.title}`);
    advanceButton.addEventListener("click", () => {
      tasks = advanceTask(tasks, task.id);
      feedback.textContent = "";
      renderTasks();
    });

    item.append(details, advanceButton);
    taskList.append(item);
  }
}

taskForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();

  try {
    tasks = addTask(tasks, taskTitle.value);
    taskTitle.value = "";
    feedback.textContent = "";
    renderTasks();
    taskTitle.focus();
  } catch (error: unknown) {
    feedback.textContent =
      error instanceof Error ? error.message : "The task could not be added.";
    taskTitle.focus();
  }
});

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const status = button.dataset.status;
    if (!status || (status !== "all" && !isTaskStatus(status))) {
      return;
    }

    activeFilter = status;
    for (const filterButton of filterButtons) {
      const selected = filterButton === button;
      filterButton.classList.toggle("is-active", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    }
    renderTasks();
  });
}

renderTasks();
