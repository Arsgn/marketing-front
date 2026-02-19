type popular = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  category: Category;
  reviews: Review[];
  favorites: Favorite[];
};
