<template>
  <v-container>
    <dish-list :dishes="dishes" :loading="loading" @saved="getAllDishes()" />
  </v-container>
</template>

<script lang="ts" setup>
import DishList from "@/components/DishList.vue";
import { Dish } from "@/types/Dish";
import { useDishes } from "@/composables/services/dishService";

const { dishes, loading, error, getAllDishes } = useDishes();

getAllDishes();
</script>
