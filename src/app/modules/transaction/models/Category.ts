export type Category = {
  id?: string;
  category: string;
  subcategories: string[];
};

export type CategoryType = 'income' | 'expense';
