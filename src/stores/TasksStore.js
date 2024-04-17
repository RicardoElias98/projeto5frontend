import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const tasksStore = create(
  persist(
    (set) => ({
      tasks: [],
      updateTasks: (updatedTasks) => set({ tasks: [...updatedTasks]  }),
    }),
    {
      name: "mystorageTasks",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
