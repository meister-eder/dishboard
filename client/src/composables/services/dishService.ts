import { ref } from "vue";
import axios from "axios";
import { Dish } from "@/types/Dish";

const BASE_URL = "http://localhost:9000";
const ENDPOINT = "/dishes";

export const useDishes = () => {
  const dishes = ref<Dish[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const url = BASE_URL + ENDPOINT;

  const getAllDishes = async () => {
    loading.value = true;
    try {
      const response = await axios.get(url);
      console.log("Response:", response);

      if (response.data) {
        dishes.value = response.data.data;
        console.log("Dishes:", dishes.value);
      }
    } catch (err) {
      error.value = "Failed to fetch dishes";
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    dishes,
    loading,
    error,
    getAllDishes,
  };
};
