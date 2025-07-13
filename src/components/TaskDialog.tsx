import { useState } from "react";
import { Calendar, Clock, MessageSquare, User, Flag, Tag, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from "./TaskCard";

interface TaskDialogProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'text-priority-low' },
  { value: 'medium', label: 'Medium', color: 'text-priority-medium' },
  { value: 'high', label: 'High', color: 'text-priority-high' },
  { value: 'urgent', label: 'Urgent', color: 'text-priority-urgent' }
];

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' }
];

export function TaskDialog({ task, open, onClose, onUpdate, onDelete }: TaskDialogProps) {
  const [editedTask, setEditedTask] = useState<Task | null>(task);
  const [newComment, setNewComment] = useState('');

  if (!task || !editedTask) return null;

  const handleSave = () => {
    if (editedTask) {
      onUpdate(editedTask);
      onClose();
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setEditedTask({
        ...editedTask,
        comments: editedTask.comments + 1
      });
      setNewComment('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <Input
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="text-lg font-semibold border-none p-0 h-auto bg-transparent"
            />
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Task Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Priority
              </label>
              <Select
                value={editedTask.priority}
                onValueChange={(value: Task['priority']) => 
                  setEditedTask({ ...editedTask, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className={option.color}>{option.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Status
              </label>
              <Select
                value={editedTask.status}
                onValueChange={(value: Task['status']) => 
                  setEditedTask({ ...editedTask, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Description
            </label>
            <Textarea
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              placeholder="Add a description..."
              className="min-h-24"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {editedTask.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setEditedTask({
                      ...editedTask,
                      tags: editedTask.tags.filter(t => t !== tag)
                    })}
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Assignee & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Assignee
              </label>
              <div className="flex items-center gap-2 p-2 border rounded-md">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={editedTask.assignee.avatar} alt={editedTask.assignee.name} />
                  <AvatarFallback className="text-xs">
                    {editedTask.assignee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{editedTask.assignee.name}</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Due Date
              </label>
              <Input
                type="date"
                value={editedTask.dueDate}
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
              />
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Comments ({editedTask.comments})
            </label>
            <div className="space-y-3">
              <div className="flex gap-3">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1"
                />
                <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                  Post
                </Button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(task.id);
                onClose();
              }}
            >
              Delete Task
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}