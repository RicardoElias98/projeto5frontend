import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const tasksStore = create(
  persist(
    (set) => ({
      tasks: [],
      addTask: (newTask) => set ((state) => ({tasks: [...state.tasks, newTask]})),
      removeTask: (taskId) => set((state) => ({tasks: state.tasks.filter((task) => task.id !== taskId)})),
      updateTask: (tasks) => set ({tasks}),
    }),
    {
      name: "mystorageTasks",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
