export function addTask(tasks, title) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
        throw new Error("Enter a task before adding it.");
    }
    const nextId = tasks.reduce((largestId, task) => Math.max(largestId, task.id), 0) + 1;
    return [...tasks, { id: nextId, title: trimmedTitle, status: "todo" }];
}
export function advanceTask(tasks, id) {
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
export function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
