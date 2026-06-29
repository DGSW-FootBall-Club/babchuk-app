import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

// NOTE: temporary [auth] diagnostics to find why login isn't persisting.
// SecureStore values over 2048 bytes can fail to write — we log the size so
// we can see whether the token blob is being written and read back at all.
const secureStorage = {
  getItem: async (name: string) => {
    const value = await SecureStore.getItemAsync(name);
    console.log(`[auth] getItem(${name}) ->`, value ? `${value.length} bytes` : "null");
    return value;
  },
  setItem: async (name: string, value: string) => {
    try {
      await SecureStore.setItemAsync(name, value);
      console.log(`[auth] setItem(${name}) ok, ${value.length} bytes`);
    } catch (e) {
      console.warn(`[auth] setItem(${name}) FAILED (${value.length} bytes)`, e);
    }
  },
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
      onRehydrateStorage: () => (state, error) => {
        console.log(
          "[auth] rehydrated. token:",
          state?.token ? "present" : "null",
          error ? `(error: ${String(error)})` : "",
        );
        useTokenStore.setState({ hydrated: true });
      },
    },
  ),
);
