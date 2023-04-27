export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: DishCategory;
  availability: DishAvailability;
  isActive: boolean;
  waitTime: number;
}

export const dishCategories = [
  "starter",
  "main course",
  "dessert",
  "beverage",
  "other",
];

export type DishCategory = (typeof dishCategories)[number];

export type Days = "Weekdays" | "Weekends";
export type MealTime = "Breakfast" | "Lunch" | "Dinner";
export const availabilityStrings = [
  "Weekdays",
  "Weekends",
  "Breakfast",
  "Lunch",
  "Dinner",
];

export interface DishAvailability {
  day: Days[];
  time: MealTime[];
}
