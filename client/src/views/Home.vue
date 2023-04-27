<template>
  <v-container>
    <h2>Dishes</h2>
    <dish-list :dishes="dishes" />
  </v-container>
</template>

<script lang="ts" setup>
import DishList from "@/components/DishList.vue";
import { Dish } from "@/types/Dish";

const dishes: Dish[] = [
  {
    id: 1,
    name: "Penne Arrabbiata",
    description: "Penne pasta with spicy tomato sauce",
    price: 9.99,
    category: "main course",
    availability: {
      breakfast: false,
      lunch: true,
      dinner: true,
      weekdays: true,
      weekends: true,
    },
    isActive: true,
    waitTime: 15,
  },
  {
    id: 2,
    name: "Caprese Salad",
    description: "Tomatoes, mozzarella, and basil with balsamic glaze",
    price: 7.99,
    category: "starter",
    availability: {
      breakfast: false,
      lunch: true,
      dinner: true,
      weekdays: true,
      weekends: true,
    },
    isActive: false,
    waitTime: 10,
  },
  {
    id: 3,
    name: "Beef Bourguignon",
    description: "Beef stewed in red wine with carrots, onions, and mushrooms",
    price: 18.99,
    category: "main course",
    availability: {
      breakfast: false,
      lunch: false,
      dinner: true,
      weekdays: true,
      weekends: true,
    },
    isActive: true,
    waitTime: 25,
  },
  {
    id: 4,
    name: "Tiramisu",
    description: "Mascarpone cheese, ladyfingers, and espresso",
    price: 6.99,
    category: "dessert",
    availability: {
      breakfast: false,
      lunch: true,
      dinner: true,
      weekdays: true,
      weekends: true,
    },
    isActive: true,
    waitTime: 5,
  },
  {
    id: 5,
    name: "Espresso",
    description: "A single shot of espresso",
    price: 2.99,
    category: "beverage",
    availability: {
      breakfast: true,
      lunch: true,
      dinner: true,
      weekdays: true,
      weekends: true,
    },
    isActive: true,
    waitTime: 3,
  },
];
</script>
