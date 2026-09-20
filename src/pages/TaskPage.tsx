import { AddTask } from "../components/AddTask.tsx";
import { TaskItem } from "../components/TaskItem.tsx";
import { useTasks } from "../hooks/useTasks.ts";
import { sortTasksByDeadline } from "../utils/sortTasksByDeadline.ts";

export const TaskPage = () => {
    const { tasks, handleAddTask, handleToggleComplete, handleDelete } = useTasks();
    const sortedTasks = sortTasksByDeadline(tasks);
    return (
        <>
            <AddTask onAddTask={handleAddTask} />
            {sortedTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDelete}
                />
            ))}
        </>
    );
}