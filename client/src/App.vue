<template>
  <v-app>
    <default-layout>
      <v-main>
        <router-view />
      </v-main>
    </default-layout>
  </v-app>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
</script>
