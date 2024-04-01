import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const categoriesStore = create(
  persist(
    (set) => ({
      categories: "",
      updateCategories: (categories) => set({ categories }),
      updateSelectedCategory: (selectedCategory) => set({ selectedCategory }),
    }),
    {
      name: "mystorageCategories",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
