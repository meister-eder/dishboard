<template>
  <v-card
    variant="outlined"
    width="100%"
    :color="!dish.isActive ? 'grey-lighten-1' : ''"
  >
    <v-card-title>
      <span class="text-warning" v-if="!dish.isActive">INACTIVE - </span>
      <span>{{ dish.name }}</span>
      <span class="text-subtitle-1 font-weight-light text-grey-darken-2">
        - {{ dish.category }}</span
      >
      <span class="float-right">{{ dish.price }} €</span>
    </v-card-title>
    <v-card-subtitle> {{ dish.description }}</v-card-subtitle>
    <v-card-subtitle>Prep time: {{ dish.waitTime }} minutes</v-card-subtitle>
    <v-card-text>
      <availability-chips :availability="dish.availability" />
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        variant="outlined"
        color="success"
        small
        prepend-icon="mdi-pencil"
        @click="editDish(dish)"
        >Edit</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        variant="tonal"
        color="error"
        small
        prepend-icon="mdi-delete"
        @click="deleteDish(dish.name)"
        >Delete</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { Dish } from "@/types/Dish";

import AvailabilityChips from "@/components/AvailabilityChips.vue";
import { reactive, ref } from "vue";

defineProps({
  dish: {
    type: Object as () => Dish,
    required: true,
  },
});

let currentDish: Dish | {} = reactive({});

const editDish = (dish: Dish) => {
  currentDish = dish;
  console.log(currentDish);
};

const deleteDish = (name: string) => {
  // TODO: nicer dialog component
  if (!confirm(`Are you sure you want to delete the dish ${name}?`)) {
    return;
  }
  console.warn("deleted ", name);
};
</script>
