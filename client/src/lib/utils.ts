
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function uniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
}

export const getCategoryColor = (category: string): string => {
  switch(category) {
    case "Work":
      return "bg-task-work";
    case "Personal":
      return "bg-task-personal";
    case "Urgent":
      return "bg-task-urgent";
    default:
      return "bg-primary";
  }
}
