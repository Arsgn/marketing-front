import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

const useGetFavorites = () => {
  return useQuery<FAVORITE.GetFavoritesRes, Error>({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await api.get<FAVORITE.GetFavoritesRes>("/favorite/get");
      return response.data;
    },
  });
};

const useAddFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation<FAVORITE.AddFavoriteRes, Error, { popularId: number }>({
    mutationFn: async ({ popularId }) => {
      const response = await api.post<FAVORITE.AddFavoriteRes>("/favorite/add", { popularId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation<FAVORITE.RemoveFavoriteRes, Error, { popularId: number }>({
    mutationFn: async ({ popularId }) => {
      const response = await api.delete<FAVORITE.RemoveFavoriteRes>(`/favorite/remove/${popularId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export { useGetFavorites, useAddFavorite, useRemoveFavorite };