import { AppConfig } from "@/configs/app-config";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AppSettingState = {
    devMode: boolean;
    themeMode: "light" | "dark";
    toggleTheme: () => void;
    appId: string | null;
    setAppId: (appId: string) => void;
};

export const useAppSettingStore = create<AppSettingState>()(
    persist(
        (set) => ({
            devMode: false,
            themeMode: "light",
            appId: null,
            setAppId: (appId) => set({ appId }),
            toggleTheme: () =>
                set((state) => ({
                    themeMode: state.themeMode === "light" ? "dark" : "light",
                })),
        }),
        {
            name: AppConfig.localStorageKeys.settings,
            storage: createJSONStorage(() => localStorage),
        }
    )
);
