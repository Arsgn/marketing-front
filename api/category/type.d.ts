namespace CATEGORY {
  export interface IPopular {
    id: number;
    title: string;
    description: string;
    price: number;
    image?: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface ICategory {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    populars: IPopular[];
  }

  export interface GetCategoriesRes {
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

interface DeleteCategoryReq {
    id: number;
  }
}
