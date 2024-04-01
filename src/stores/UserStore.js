import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      token: "",
      userPhoto:
        "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png",
      updateToken: (token) => set({ token }),
      updateUserPhoto: (userPhoto) => set({ userPhoto }),
      updateAllUsers: (allUsers) => set({ allUsers }),
      updateLoginUser: (loginUser) => set({ loginUser }),
      updateUserSelected: (userSelected) => set({ userSelected }),
      updateCounter: (counter) => set({ counter }),
      updateFirstName: (firstName) => set({ firstName }),
      
    }),
    {
      name: "mystorage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
