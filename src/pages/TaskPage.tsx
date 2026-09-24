import { useState } from "react";
import { AddTask } from "../components/AddTask.tsx";
import { TaskItem } from "../components/TaskItem.tsx";
import { TaskFilter } from "../components/TaskFilter.tsx";
import { CategoryFilter } from "../components/CategoryFilter.tsx";
import { useTasks } from "../hooks/useTasks.ts";
import { useAuth } from "../hooks/useAuth.ts";
import { sortTasksByDeadline } from "../utils/sortTasksByDeadline.ts";
import { filterTasks, filterTasksByCategory, type FilterCategory } from "../utils/filterTasks.ts";
import type { Task } from "../types/Task.ts";
import { Button } from "../components/ui/Button.tsx";
import { sendTaskSummaryEmail } from "../services/emailService.ts";
import "../components/styles/TaskPage.css";

export const TaskPage = () => {
    const { tasks, handleAddTask, handleToggleComplete, handleDelete, handleEditTask } = useTasks();
    const { user } = useAuth();
    const [emailStatus, setEmailStatus] = useState<string | null>(null);
    const [activePanel, setActivePanel] = useState<"new-task" | "filters">("new-task");
    const [activeFilters, setActiveFilters] = useState<FilterCategory[]>([]);
    const [activeCategories, setActiveCategories] = useState<Task["category"][]>([]);

    const statusFiltered = filterTasks(tasks, activeFilters);
    const categoryFiltered = filterTasksByCategory(statusFiltered, activeCategories);
    const sortedTasks = sortTasksByDeadline(categoryFiltered);

    const handleSendSummary = async () => {
        if (!user?.email) return;

        try {
            await sendTaskSummaryEmail(user.email, tasks);
            setEmailStatus("Resumen enviado correctamente a tu email.");
        } catch {
            setEmailStatus("Ocurrió un error al enviar el resumen. Intentá de nuevo.");
        }
    };

    return (
        <main className="task-page">
            <section className="task-page__workspace">
                <aside className="task-page__sidebar">
                    <button
                        className={`task-page__nav-btn ${activePanel === "new-task" ? "task-page__nav-btn--active" : ""}`}
                        type="button"
                        onClick={() => setActivePanel("new-task")}
                        aria-pressed={activePanel === "new-task"}
                    >
                        Nueva tarea
                    </button>
                    <button
                        className={`task-page__nav-btn ${activePanel === "filters" ? "task-page__nav-btn--active" : ""}`}
                        type="button"
                        onClick={() => setActivePanel("filters")}
                        aria-pressed={activePanel === "filters"}
                    >
                        Filtros
                    </button>
                </aside>

                <section className="task-page__panel" aria-live="polite">
                    <h1 className="task-page__panel-title">
                        {activePanel === "new-task" ? "Nueva tarea" : "Filtros"}
                    </h1>
                    {activePanel === "new-task" ? (
                        <>
                            <AddTask onAddTask={handleAddTask} />
                            <div className="task-page__actions">
                                <Button label="Enviar resumen por email" onClick={handleSendSummary} />
                                {emailStatus && <p className="task-form__success">{emailStatus}</p>}
                            </div>
                        </>
                    ) : (
                        <div className="task-page__filters-panel">
                            <div className="task-page__filter-group">
                                <TaskFilter activeFilters={activeFilters} onFilterChange={setActiveFilters} />
                            </div>
                            <div className="task-page__filter-group">
                                <CategoryFilter activeCategories={activeCategories} onCategoryChange={setActiveCategories} />
                            </div>
                        </div>
                    )}
                </section>
            </section>

            <section className="task-page__task-area" id="task-list" aria-label="Lista de tareas">
                <div className="task-page__task-list">
                    {sortedTasks.length > 0 ? sortedTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggleComplete={handleToggleComplete}
                            onDelete={handleDelete}
                            onEditTask={handleEditTask}
                        />
                    )) : (
                        <div className="task-page__empty">
                            <span className="task-page__empty-icon" aria-hidden="true">&#128221;</span>
                            <p>No hay tareas para mostrar.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}