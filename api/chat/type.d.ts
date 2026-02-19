declare namespace CATEGORY {
  interface Popular {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string | null;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
  }

  interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    populars: Popular[];
  }

  interface GetCategoriesRes {
    success: boolean;
    data: Category[];
  }

  interface CreateCategoryReq {
    name: string;
  }

  interface CreateCategoryRes {
    success: boolean;
    data: Category;
  }

  interface UpdateCategoryReq {
    id: number;
    name: string;
  }

  interface UpdateCategoryRes {
    success: boolean;
    data: Category;
  }

  interface DeleteCategoryRes {
    success: boolean;
    message: string;
  }
}
