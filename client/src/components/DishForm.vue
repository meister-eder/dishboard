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
        <!-- <v-select
            v-model="editedItem.category"
            :items="categoryOptions"
            label="Category"
            required
          ></v-select> -->
        <v-text-field
          v-model.number="editedItem.price"
          :rules="priceRules"
          label="Price"
          required
        ></v-text-field>
        <!-- <v-select
            v-model="editedItem.availability"
            :items="availabilityOptions"
            label="Availability"
            multiple
            required
          ></v-select> -->
        <v-text-field
          v-model.number="editedItem.waitTime"
          :rules="waitTimeRules"
          label="Wait Time"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="save" :disabled="!valid">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { Dish } from "@/types/Dish";
import { ref } from "vue";

const props = defineProps({
  dish: {
    type: Object as () => Dish,
    required: true,
  },
});

const emit = defineEmits(["save", "cancel"]);

const editedItem = ref(Object.assign({}, props.dish));
const valid = ref(true);
const dialog = ref(false);

const nameRules = [
  (v) => !!v || "Name is required",
  (v) => v.length <= 50 || "Name must be less than 50 characters",
];
const priceRules = [(v) => !!v || "Price is required"];
const waitTimeRules = [
  (v) => !v || v >= 0 || "Wait time must be a positive number",
];

// const categoryOptions = props.categories;
// const availabilityOptions = props.availabilities;

function save() {
  if (valid.value) {
    emit("save", editedItem.value);
    cancel();
  }
}

function cancel() {
  editedItem.value = Object.assign({}, props.dish);
  valid.value = true;
  dialog.value = false;
  emit("cancel");
}

const formTitle = ref("Edit Dish");
if (!editedItem.value.id) {
  formTitle.value = "New Dish";
}
</script>
