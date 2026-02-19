declare namespace FAVORITE {
  interface Popular {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    categoryId: number;
    category?: {
      id: number;
      name: string;
    };
  }

  interface FavoriteItem {
    id: number;
    userId: number;
    popularId: number;
    popular: Popular;
  }

  interface GetFavoritesRes {
    success: boolean;
    data: FavoriteItem[];
  }

  interface AddFavoriteRes {
    success: boolean;
    data: FavoriteItem;
  }

  interface RemoveFavoriteRes {
    success: boolean;
    message: string;
  }
}