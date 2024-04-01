import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const tasksStore = create(
  persist(
    (set) => ({
      tasks: "",
      updateTasks: (tasks) => set({ tasks }),
    }),
    {
      name: "mystorageTasks",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
