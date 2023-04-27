export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: DishCategories;
  availability: DishAvailability;
  isActive: boolean;
  waitTime: number;
}

//TODO: type is a single entry, export the list as enum
export type DishCategories =
  | "starter"
  | "main course"
  | "dessert"
  | "beverage"
  | "other";

export interface DishAvailability {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  weekdays: boolean;
  weekends: boolean;
}
