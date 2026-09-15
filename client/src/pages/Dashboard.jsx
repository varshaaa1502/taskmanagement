import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import api from "../api";

export default function Dashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch (err) {
      if (err.response?.status === 401) onLogout();
      else setError("Could not load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTasks(); }, []);

  const saveTask = async (form) => {
    try {
      setError("");
      if (editingTask) {
        const { data } = await api.put(`/tasks/${editingTask._id}`, form);
        setTasks(tasks.map(t => t._id === data._id ? data : t));
        setEditingTask(null);
      } else {
        const { data } = await api.post("/tasks", form);
        setTasks([data, ...tasks]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not save task.");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      if (editingTask?._id === id) setEditingTask(null);
    } catch {
      setError("Could not delete task.");
    }
  };

  const changeStatus = async (task, status) => {
    try {
      const { data } = await api.put(`/tasks/${task._id}`, { status });
      setTasks(tasks.map(t => t._id === data._id ? data : t));
    } catch {
      setError("Could not update status.");
    }
  };

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return tasks.filter(task => {
      const matchesFilter = filter === "all" || task.status === filter;
      const matchesSearch = !term || `${task.title} ${task.description}`.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  const counts = {
    all: tasks.length,
    todo: tasks.filter(t => t.status === "todo").length,
    "in-progress": tasks.filter(t => t.status === "in-progress").length,
    completed: tasks.filter(t => t.status === "completed").length
  };

  return (
    <div className="app">
      <Navbar user={user} onLogout={onLogout} />

      <main className="dashboard">
        <div className="welcome">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>Task dashboard</h1>
            <p className="muted">Plan your day, track progress, and get things done.</p>
          </div>
          <div className="stat"><strong>{counts.completed}</strong><span>Completed</span></div>
        </div>

        {error && <div className="error">{error}</div>}

        <section className="dashboard-grid">
          <TaskForm editingTask={editingTask} onSave={saveTask} onCancel={() => setEditingTask(null)} />

          <div className="tasks-panel">
            <div className="toolbar">
              <input className="search" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} />
              <div className="filters">
                {[
                  ["all", "All"],
                  ["todo", "To Do"],
                  ["in-progress", "In Progress"],
                  ["completed", "Completed"]
                ].map(([value, label]) => (
                  <button key={value} className={filter === value ? "filter active" : "filter"} onClick={() => setFilter(value)}>
                    {label} <span>{counts[value]}</span>
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="empty">Loading tasks...</div>
            ) : filtered.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">✓</div>
                <h3>No tasks found</h3>
                <p>Try another filter or create a new task.</p>
              </div>
            ) : (
              <div className="task-list">
                {filtered.map(task => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={setEditingTask}
                    onDelete={deleteTask}
                    onStatusChange={changeStatus}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
