import { create } from "zustand";

interface ChatState {
  chatMessage: string;
  setChatMessage: (message: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chatMessage: "",
  setChatMessage: (message) => set({ chatMessage: message }),
}));
