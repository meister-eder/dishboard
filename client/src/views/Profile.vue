<template>
  <v-container>
    <h1>{{ user.fullName }}'s Profile</h1>
    <v-text-field v-model="user.name" label="Name"></v-text-field>
    <v-text-field v-model="user.lastName" label="Last name"></v-text-field>
    <v-text-field v-model="user.email" label="Email"></v-text-field>
  </v-container>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/user";

const user = useUserStore();
</script>
