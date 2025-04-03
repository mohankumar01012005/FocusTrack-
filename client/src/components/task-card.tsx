
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Task, useTask } from "@/context/task-context";
import { formatDate, getCategoryColor } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Pencil, Trash2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  index: number;
  openEditModal: (task: Task) => void;
}

export const TaskCard = ({ task, index, openEditModal }: TaskCardProps) => {
  const { toggleTaskCompletion, deleteTask } = useTask();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => deleteTask(task.id), 300);
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDeleting ? 0 : 1, y: isDeleting ? -20 : 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <Card className="overflow-hidden border task-card-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full min-w-9 h-9 ${
                task.completed 
                  ? "bg-primary/10 text-primary" 
                  : "border-2 border-muted hover:bg-primary/5"
              }`}
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.completed && <Check className="h-4 w-4" />}
            </Button>
            
            <div className="flex-1">
              <h3 className={`font-medium text-lg ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                {task.title}
              </h3>
              <p className={`text-sm mt-1 ${task.completed ? "text-muted-foreground" : "text-foreground/80"}`}>
                {task.description}
              </p>
              
              <div className="flex items-center gap-2 mt-3">
                <span className={`h-2 w-2 rounded-full ${getCategoryColor(task.category)}`} />
                <span className="text-xs text-muted-foreground">{task.category}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {formatDate(task.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end gap-2 p-2 bg-muted/30">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => openEditModal(task)}
          >
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
