import { addTask, advanceTask, filterByStatus } from "./model.js";
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const feedback = document.getElementById("feedback");
const filterButtons = document.querySelectorAll("[data-status]");
let tasks = [];
let activeFilter = "all";
function isTaskStatus(value) {
    return value === "todo" || value === "in-progress" || value === "done";
}
function renderTasks() {
    const visibleTasks = activeFilter === "all" ? tasks : filterByStatus(tasks, activeFilter);
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
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
        tasks = addTask(tasks, taskTitle.value);
        taskTitle.value = "";
        feedback.textContent = "";
        renderTasks();
        taskTitle.focus();
    }
    catch (error) {
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
