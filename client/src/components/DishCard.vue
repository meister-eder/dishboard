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
        @click="deleteDishRequest(dish)"
        :loading="loading"
        >Delete</v-btn
      >
    </v-card-actions>
    <v-dialog v-model="dialogOpen" persistent width="1024">
      <v-card>
        <dish-form
          :dish="dish"
          @cancel="closeDialog"
          @saved="$emit('saved')"
        ></dish-form>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { Dish } from "@/types/Dish";

import AvailabilityChips from "@/components/AvailabilityChips.vue";
import DishForm from "@/components/DishForm.vue";
import { ref } from "vue";

import { useDishes } from "@/composables/services/dishService";

const { loading, deleteDish } = useDishes();

defineProps({
  dish: {
    type: Object as () => Dish,
    required: true,
  },
});

const emit = defineEmits(["saved"]);

const dialogOpen = ref(false);

const editDish = (dish: Dish) => {
  console.log(dish);

  dialogOpen.value = true;
};

const closeDialog = () => {
  dialogOpen.value = false;
};

const deleteDishRequest = async (dish: Dish) => {
  // TODO: nicer dialog component
  if (!confirm(`Are you sure you want to delete the dish ${dish.name}?`)) {
    return;
  }
  try {
    loading.value = true;
    await deleteDish(dish.id);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
    closeDialog();
    emit("saved");
  }
};
</script>
