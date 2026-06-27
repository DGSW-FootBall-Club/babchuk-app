import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

const secureStorage = {
  getItem: (name: string) => SecureStore.getItemAsync(name),
  setItem: (name: string, value: string) => SecureStore.setItemAsync(name, value),
  removeItem: (name: string) => SecureStore.deleteItemAsync(name),
};

type Tokens = { accessToken: string; refreshToken: string };

type TokenState = {
  token: string | null;
  refreshToken: string | null;
  hydrated: boolean;
  setTokens: (tokens: Tokens) => void;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      hydrated: false,
      setTokens: ({ accessToken, refreshToken }) =>
        set({ token: accessToken, refreshToken }),
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null, refreshToken: null }),
    }),
    {
      name: "auth-token",
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => () => {
        useTokenStore.setState({ hydrated: true });
      },
    },
  ),
);
