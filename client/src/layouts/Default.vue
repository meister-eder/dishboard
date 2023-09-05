<template>
  <div>
    <v-app-bar color="primary" app>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-icon>mdi-food</v-icon>
      <v-app-bar-title class="font-weight-bold">Dishboard</v-app-bar-title>
      <v-spacer></v-spacer>

      <template v-slot:append>
        <span>Hi {{ userStore.name }}!</span>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list color="transparent">
        <router-link to="/" style="text-decoration: none; color: inherit">
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Home"
          ></v-list-item>
        </router-link>
        <router-link to="/about" style="text-decoration: none; color: inherit">
          <v-list-item
            prepend-icon="mdi-information"
            title="About"
          ></v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/store/user";

const drawer = ref(false);
const userStore = useUserStore();
</script>
