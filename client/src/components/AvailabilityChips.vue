<template>
  <v-chip-group>
    <!-- display weekends/days first since it's most important and always required -->
    <span v-if="availability.day">
      <v-chip v-for="(day, i) in availability.day" :key="i"> {{ day }}</v-chip>
    </span>
    <span v-if="availability.time">
      <v-chip v-for="(time, i) in availability.time" :key="i">
        {{ time }}</v-chip
      >
    </span>
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
