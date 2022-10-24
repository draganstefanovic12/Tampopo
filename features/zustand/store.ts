import create from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  //type out user when i figure out this auth thing
  handleLogInUser: (user: any) => set(() => ({ user: user })),
  handleLogoutUser: () => set(() => ({ user: null })),
}));
