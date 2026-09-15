import { useEffect, useState } from "react";

const empty = { title: "", description: "", status: "todo", priority: "medium", dueDate: "" };

export default function TaskForm({ editingTask, onSave, onCancel }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "todo",
        priority: editingTask.priority || "medium",
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : ""
      });
    } else {
      setForm(empty);
    }
  }, [editingTask]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
    if (!editingTask) setForm(empty);
  };

  return (
    <form className="task-form" onSubmit={submit}>
      <div className="form-heading">
        <div>
          <h2>{editingTask ? "Edit task" : "Create a task"}</h2>
          <p>{editingTask ? "Update the task details." : "Add something you need to get done."}</p>
        </div>
        {editingTask && <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>}
      </div>

      <label>Title<input name="title" value={form.title} onChange={change} placeholder="e.g. Finish project report" required /></label>
      <label>Description<textarea name="description" value={form.description} onChange={change} placeholder="Add notes..." rows="4" /></label>

      <div className="form-grid">
        <label>Status
          <select name="status" value={form.status} onChange={change}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label>Priority
          <select name="priority" value={form.priority} onChange={change}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>

      <label>Due date<input type="date" name="dueDate" value={form.dueDate} onChange={change} /></label>
      <button className="btn btn-primary full" type="submit">{editingTask ? "Save changes" : "Add task"}</button>
    </form>
  );
}
