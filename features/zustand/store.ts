import create from "zustand";
import { User } from "../user/types/types";

export const useUserStore = create((set) => ({
  user: null,
  handleLogInUser: (user: User) => set(() => ({ user: user })),
  handleLogoutUser: () => set(() => ({ user: null })),
}));
