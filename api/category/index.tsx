import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

const useGetCategories = () => {
  return useQuery<CATEGORY.GetCategoriesRes>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get<CATEGORY.GetCategoriesRes>(
        "/category/get"
      );
      return response.data;
    },
  });
};


const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CATEGORY.CreateCategoryRes,
    Error,
    CATEGORY.CreateCategoryReq
  >({
    mutationFn: async (data) => {
      const response = await api.post<CATEGORY.CreateCategoryRes>(
        "/categories",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CATEGORY.UpdateCategoryRes,
    Error,
    CATEGORY.UpdateCategoryReq
  >({
    mutationFn: async ({ id, name }) => {
      const response = await api.put<CATEGORY.UpdateCategoryRes>(
        `/categories/${id}`,
        { name }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<CATEGORY.DeleteCategoryRes, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      const response = await api.delete<CATEGORY.DeleteCategoryRes>(
        `/categories/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export {
  useGetCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
};
