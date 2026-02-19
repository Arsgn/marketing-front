import { create } from "zustand";

type FavoriteStore = {
  favoriteIds: number[];
  setFavoriteIds: (ids: number[]) => void;
  isFavorite: (popularId: number) => boolean;
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favoriteIds: [],

  setFavoriteIds: (ids: number[]) => set({ favoriteIds: ids }),

  isFavorite: (popularId: number) => get().favoriteIds.includes(popularId),
}));