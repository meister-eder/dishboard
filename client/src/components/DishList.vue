<template>
  <v-container>
    <v-card variant="flat">
      <v-row>
        <v-col cols="8">
          <v-text-field
            v-model="search"
            variant="outlined"
            clearable
            append-icon="mdi-text-search"
            label="Search"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <v-card-actions>
            <v-card-subtitle> Advanced Search </v-card-subtitle>

            <v-btn
              :icon="showAdvancedSearch ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="showAdvancedSearch = !showAdvancedSearch"
            ></v-btn>
          </v-card-actions>
        </v-col>
      </v-row>

      <v-expand-transition>
        <div v-show="showAdvancedSearch">
          <v-row>
            <v-col>
              <v-select
                v-model="selectedCategory"
                :items="categories"
                variant="outlined"
                clearable
                label="Category"
                dense
              ></v-select>
            </v-col>
            <v-col>
              <!-- <v-select
                v-model="selectedAvailability"
                :items="availabilities"
                label="Availability"
                variant="outlined"
                dense
                chips
                clearable
                multiple
              ></v-select> -->
            </v-col>
          </v-row>
          <v-checkbox label="Hide inactive" v-model="hideInactive"></v-checkbox>
        </div>
      </v-expand-transition>
    </v-card>
    <v-divider></v-divider>
    <p class="my-4">{{ filteredDishes.length }} results</p>
    <v-progress-circular
      v-if="loading"
      color="primary"
      indeterminate
    ></v-progress-circular>

    <div
      v-for="dish in filteredDishes"
      :key="dish.id"
      class="d-flex align-center flex-column"
    >
      <dish-card :dish="dish" class="mb-4" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { Dish, DishAvailability, DishCategories } from "@/types/Dish";
import DishCard from "@/components/DishCard.vue";
import { computed, ref } from "vue";

const props = defineProps({
  dishes: {
    type: Array as () => Dish[],
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
  },
});

const categories: DishCategories[] = [
  "starter",
  "main course",
  "dessert",
  "beverage",
  "other",
];

//TODO: change this type to a string list
// const availabilities: DishAvailability[] = [
//   "weekdays",
//   "weekends",
//   "breakfast",
//   "lunch",
//   "dinner"
// ];

const search = ref("");
const selectedCategory = ref<DishCategories | null>(null);
const selectedAvailability = ref<DishAvailability | null>(null);
const showAdvancedSearch = ref(false);
const hideInactive = ref(false);

const filteredDishes = computed(() => {
  let result = props.dishes;
  if (hideInactive.value) {
    result = result.filter((dish) => dish.isActive);
  }
  if (search.value) {
    result = result.filter((dish) =>
      dish.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  if (selectedCategory.value) {
    result = result.filter((dish) => dish.category === selectedCategory.value);
  }
  // if (selectedAvailability.value) {
  //   result = result.filter((dish) =>
  //     dish.availability.includes(selectedAvailability.value)
  //   );
  // }
  return result;
});
</script>
