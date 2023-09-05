import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const name = ref("Tim");
  const lastName = ref("Eder");
  const fullName = computed(() => {
    return `${name.value} ${lastName.value}`;
  });
  const email = ref("timeder92@gmail.com");

  return { name, lastName, fullName, email };
});
