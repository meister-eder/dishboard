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
                :items="dishCategories"
                variant="outlined"
                clearable
                label="Category"
                dense
              ></v-select>
            </v-col>
            <v-col>
              <!-- i removed the "multiple" prop because there is currently a bug with the type handling
                this prevented the image from being built
                see: https://github.com/vuejs/language-tools/issues/2708
             -->
              <v-select
                v-model="selectedAvailabilities"
                :items="availabilityStrings"
                label="Availability"
                variant="outlined"
                dense
                chips
                clearable
              ></v-select>
            </v-col>
          </v-row>
          <v-checkbox label="Hide inactive" v-model="hideInactive"></v-checkbox>
        </div>
      </v-expand-transition>
    </v-card>
    <v-divider></v-divider>
    <v-row align="center">
      <v-col>
        <p class="my-4">{{ filteredDishes.length }} results</p>
      </v-col>
      <v-col align="center">
        <v-btn large color="primary" @click="dialogOpen = true">New Dish</v-btn>
        <v-dialog v-model="dialogOpen" persistent width="1024">
          <v-card>
            <dish-form
              @cancel="dialogOpen = false"
              @saved="emit('saved')"
            ></dish-form>
          </v-card>
        </v-dialog>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-progress-circular
      v-if="loading"
      color="primary"
      indeterminate
    ></v-progress-circular>

    <TransitionGroup name="dish-list">
      <div
        v-for="dish in filteredDishes"
        :key="dish.id"
        class="d-flex align-center flex-column"
      >
        <dish-card :dish="dish" class="mb-4" @saved="$emit('saved')" />
      </div>
    </TransitionGroup>
  </v-container>
</template>

<script setup lang="ts">
import {
  Dish,
  availabilityStrings,
  dishCategories,
  DishCategory,
  Days,
  MealTime,
} from "@/types/Dish";
import DishCard from "@/components/DishCard.vue";
import DishForm from "@/components/DishForm.vue";
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

const emit = defineEmits(["saved"]);

const search = ref("");
const selectedCategory = ref<DishCategory | null>(null);
const selectedAvailabilities = ref<Days | MealTime | []>([]);
const showAdvancedSearch = ref(false);
const hideInactive = ref(false);
const dialogOpen = ref(false);

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

  // TODO: this doesnt work yet
  if (
    selectedAvailabilities.value &&
    selectedAvailabilities.value.length !== 0
  ) {
    result = result.filter((dish) => {
      console.log("Dish", dish.availability.day);
      console.log(selectedAvailabilities.value);
      // if (selectedAvailabilities.value.includes(dish.availability.day)) {
      //   return true;
      // }
      return true;
      // return selectedAvailabilities.value.includes(dish.availability.day);
    });
  }
  return result;
});
</script>
<style>
.dish-list-move,
.dish-list-enter-active,
.dish-list-leave-active {
  transition: all 0.5s ease;
}
.dish-list-enter-from,
.dish-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.dish-list-leave-active {
  position: absolute;
}
</style>
