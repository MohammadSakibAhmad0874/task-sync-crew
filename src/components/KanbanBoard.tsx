import { useState } from "react";
import { Plus, Users, Filter, MoreHorizontal } from "lucide-react";
import { TaskCard, Task } from "./TaskCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Column {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  color: string;
}

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdate: (tasks: Task[]) => void;
  onTaskClick: (task: Task) => void;
  onAddTask: (status: Task['status']) => void;
}

const columns: Column[] = [
  { id: 'todo', title: 'To Do', status: 'todo', color: 'bg-muted' },
  { id: 'in-progress', title: 'In Progress', status: 'in-progress', color: 'bg-warning/20' },
  { id: 'done', title: 'Done', status: 'done', color: 'bg-success/20' }
];

export function KanbanBoard({ tasks, onTaskUpdate, onTaskClick, onAddTask }: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault();
    setDragOverColumn(null);
    
    if (draggedTask && draggedTask.status !== newStatus) {
      const updatedTasks = tasks.map(task =>
        task.id === draggedTask.id ? { ...task, status: newStatus } : task
      );
      onTaskUpdate(updatedTasks);
    }
    setDraggedTask(null);
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="flex gap-6 h-full overflow-x-auto pb-6">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.status);
        const isDragOver = dragOverColumn === column.id;
        
        return (
          <div
            key={column.id}
            className={`flex-shrink-0 w-80 kanban-column ${isDragOver ? 'drop-zone' : ''}`}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-foreground">{column.title}</h2>
                <Badge variant="secondary" className="text-xs">
                  {columnTasks.length}
                </Badge>
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onAddTask(column.status)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {columnTasks.map((task) => (
                <div
                  key={task.id}
                  className={`group ${draggedTask?.id === task.id ? 'dragging' : ''}`}
                >
                  <TaskCard
                    task={task}
                    onDragStart={handleDragStart}
                    onClick={onTaskClick}
                  />
                </div>
              ))}
              
              {columnTasks.length === 0 && !isDragOver && (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No tasks yet</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => onAddTask(column.status)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add task
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}