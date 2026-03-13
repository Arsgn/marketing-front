namespace CATEGORY {
  interface IPopular {
    id: number;
    title: string;
    description: string;
    price: number;
    image?: string;
    createdAt: string;
    updatedAt: string;
  }

  interface ICategory {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    populars: IPopular[];
  }

  interface GetCategoriesRes {
    success: boolean;
    data: ICategory[];
  }

  interface CreateCategoryReq {
    name: string;
  }

  interface CreateCategoryRes {
    success: boolean;
    data: ICategory;
  }

  interface UpdateCategoryReq {
    id: number;
    name: string;
  }

  interface UpdateCategoryRes {
    success: boolean;
    data: ICategory;
  }

  interface DeleteCategoryReq {
    id: number;
  }

  interface DeleteCategoryRes {
    success: boolean;
    message: string;
  }
}
