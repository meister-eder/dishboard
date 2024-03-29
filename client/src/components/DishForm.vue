<template>
  <v-card>
    <v-card-title>
      <span>{{ formTitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="editedItem.name"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="editedItem.description"
          label="Description"
        ></v-text-field>
        <v-select
          v-model="editedItem.category"
          :items="dishCategories"
          label="Category"
          required
        ></v-select>
        <v-row>
          <v-col>
            <v-text-field
              v-model.number="editedItem.price"
              :rules="priceRules"
              label="Price (€)"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model.number="editedItem.waitTime"
              :rules="waitTimeRules"
              label="Wait Time (minutes)"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="editedItem.availability.day"
              :items="availabilityDays"
              label="Availability days"
              chips
              clearable
              multiple
              required
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              v-model="editedItem.availability.time"
              :items="availabilityTimes"
              label="Availability times"
              chips
              clearable
              multiple
              required
            ></v-select>
          </v-col>
        </v-row>

        <v-checkbox v-model="editedItem.isActive" label="Active"></v-checkbox>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" @click="cancel">Cancel</v-btn>
      <v-btn
        color="blue darken-1"
        @click="save"
        :loading="loading"
        :disabled="!valid"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { Dish, dishCategories, availabilityStrings } from "@/types/Dish";
import { ref } from "vue";

import { useDishes } from "@/composables/services/dishService";

const { loading, insertDish } = useDishes();

const props = defineProps({
  dish: {
    type: Object as () => Dish,
    required: false,
  },
});

const emit = defineEmits(["saved", "cancel"]);
let editedItem = ref();

if (props.dish) {
  editedItem = ref(Object.assign({}, props.dish));
} else {
  editedItem = ref(
    Object.assign(
      {},
      {
        id: null,
        name: "",
        description: "",
        price: 0,
        category: "",
        availability: {
          day: [],
          time: [],
        },
      }
    )
  );
}
const valid = ref(true);

const nameRules = [
  (v: any) => !!v || "Name is required",
  (v: any) => v.length <= 50 || "Name must be less than 50 characters",
];
const priceRules = [(v: number) => !!v || "Price is required"];
const waitTimeRules = [
  (v: any) => !v || v >= 0 || "Wait time must be a positive number",
];

const availabilityDays = availabilityStrings.slice(0, 2);

const availabilityTimes = availabilityStrings.slice(2);

async function save() {
  try {
    loading.value = true;
    await insertDish(editedItem.value);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
    emit("saved");
    cancel();
  }
}

function cancel() {
  emit("cancel");
}

const formTitle = ref("Edit Dish");
if (!editedItem.value.id) {
  formTitle.value = "New Dish";
}
</script>
