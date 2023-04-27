<template>
  <v-chip-group>
    <!-- display weekends/days first since it's most important and always required -->
    <v-chip v-if="availability.weekdays">Weekdays</v-chip>
    <v-chip v-if="availability.weekends">Weekends</v-chip>
    <v-chip v-if="availability.breakfast">Breakfast</v-chip>
    <v-chip v-if="availability.lunch">Lunch</v-chip>
    <v-chip v-if="availability.dinner">Dinner</v-chip>
  </v-chip-group>
</template>

<script setup lang="ts">
import { DishAvailability } from "@/types/Dish";

defineProps({
  availability: {
    type: Object as () => DishAvailability,
    required: true,
  },
});
</script>
