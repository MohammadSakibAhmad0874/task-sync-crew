import { Calendar, Clock, MessageSquare, User, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'done';
  assignee: {
    name: string;
    avatar: string;
    id: string;
  };
  dueDate: string;
  tags: string[];
  comments: number;
}

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onClick: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-priority-low/20 text-priority-low border-priority-low/30',
  medium: 'bg-priority-medium/20 text-priority-medium border-priority-medium/30',
  high: 'bg-priority-high/20 text-priority-high border-priority-high/30',
  urgent: 'bg-priority-urgent/20 text-priority-urgent border-priority-urgent/30'
};

const priorityBorderColors = {
  low: 'priority-low',
  medium: 'priority-medium', 
  high: 'priority-high',
  urgent: 'priority-urgent'
};

export function TaskCard({ task, onDragStart, onClick }: TaskCardProps) {
  return (
    <div
      className={`task-card cursor-pointer ${priorityBorderColors[task.priority]} fade-in`}
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onClick={() => onClick(task)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-foreground leading-tight">{task.title}</h3>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-3 w-3" />
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {task.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-4">
        {task.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs px-2 py-1">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
            <AvatarFallback className="text-xs">
              {task.assignee.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <Badge className={priorityColors[task.priority]} variant="outline">
            {task.priority}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {task.comments > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>{task.comments}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}