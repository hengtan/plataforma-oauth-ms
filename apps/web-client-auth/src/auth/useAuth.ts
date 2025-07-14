import { create } from "zustand";

interface AuthState {
    accessToken: string | null;
    idToken: string | null;
    setTokens: (accessToken: string, idToken: string) => void;
    logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
    accessToken: null,
    idToken: null,
    setTokens: (accessToken, idToken) => set({ accessToken, idToken }),
    logout: () => set({ accessToken: null, idToken: null }),
}));