import create from "zustand";
import { User } from "../user/types/types";

type UserState = {
  user: User;
  handleLoginUser: (user: User) => void;
  handleLogoutUser: () => void;
};

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  handleLoginUser: (user: User) => set(() => ({ user: user })),
  handleLogoutUser: () => set(() => ({ user: null })),
}));
