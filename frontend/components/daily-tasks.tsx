"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Calendar, Gift } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Task {
  id: string
  title: string
  points: number
  completed: boolean
}

export default function DailyTasks() {
  const { toast } = useToast()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "apply-job",
      title: "Apply to a job",
      points: 20,
      completed: false,
    },
    {
      id: "update-profile",
      title: "Update your profile",
      points: 10,
      completed: true,
    },
    {
      id: "save-jobs",
      title: "Save 3 jobs for later",
      points: 5,
      completed: false,
    },
    {
      id: "skill-assessment",
      title: "Complete a skill assessment",
      points: 30,
      completed: false,
    },
  ])

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const progress = (completedTasks / totalTasks) * 100

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const newCompleted = !task.completed

          if (newCompleted) {
            toast({
              title: "Task completed!",
              description: `You earned ${task.points} XP`,
              duration: 3000,
            })
          }

          return { ...task, completed: newCompleted }
        }
        return task
      }),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Daily Tasks
        </CardTitle>
        <CardDescription>Complete tasks to earn XP and rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span>
              {completedTasks}/{totalTasks} completed
            </span>
            <span className="font-medium">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-2">
              <Checkbox
                id={task.id}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className={task.completed ? "bg-primary text-primary-foreground" : ""}
              />
              <div className="flex flex-1 items-center justify-between">
                <label
                  htmlFor={task.id}
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    task.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {task.title}
                </label>
                <span className="text-xs font-medium text-primary">+{task.points} XP</span>
              </div>
            </div>
          ))}
        </div>

        {completedTasks === totalTasks && (
          <div className="mt-4 rounded-lg bg-secondary/20 p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-sm font-medium">
              <Gift className="h-4 w-4" />
              All tasks completed! Come back tomorrow for more.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
