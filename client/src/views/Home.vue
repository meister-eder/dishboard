<template>
  <v-container>
    <dish-list :dishes="dishes" :loading="loading" @saved="getAllDishes()" />
  </v-container>
</template>

<script lang="ts" setup>
import DishList from "@/components/DishList.vue";
import { useDishes } from "@/composables/services/dishService";

const { dishes, loading, getAllDishes } = useDishes();

try {
  loading.value = true;
  getAllDishes();
} catch (error) {
  console.log(error);
} finally {
  loading.value = false;
}
</script>
