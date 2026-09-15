export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const statusLabel = {
    todo: "To Do",
    "in-progress": "In Progress",
    completed: "Completed"
  }[task.status];

  const due = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No due date";

  return (
    <article className={`task-card ${task.status === "completed" ? "is-complete" : ""}`}>
      <div className="task-top">
        <span className={`priority ${task.priority}`}>{task.priority}</span>
        <button className="icon-btn" title="Delete task" onClick={() => onDelete(task._id)}>×</button>
      </div>

      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}

      <div className="task-meta">
        <span>📅 {due}</span>
        <span className={`status ${task.status}`}>{statusLabel}</span>
      </div>

      <div className="task-actions">
        <select value={task.status} onChange={(e) => onStatusChange(task, e.target.value)}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button className="btn btn-small" onClick={() => onEdit(task)}>Edit</button>
      </div>
    </article>
  );
}
