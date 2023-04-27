import { ref } from "vue";
import axios from "axios";
import { Dish } from "@/types/Dish";

const BASE_URL = "http://localhost:9000";
const ENDPOINT = "/dishes";

export const useDishes = () => {
  const dishes = ref<Dish[]>([]);
  const dish = ref<Dish>();
  const updatedDish = ref<Dish>();
  const deletedDish = ref<Dish>();
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

  const clearAllDishes = async () => {
    loading.value = true;
    try {
      await axios.get(url + "/clear");
    } catch (err) {
      error.value = "Failed to clear dishes";
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  const getDishById = async (id: string) => {
    loading.value = true;
    try {
      const response = await axios.get(url + "/" + id);

      if (response.data) {
        dish.value = response.data.data;
      }
    } catch (err) {
      error.value = "Failed to get dish";
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  const insertDish = async (id?: string) => {
    loading.value = true;
    try {
      const response = await axios.put(url, id);

      if (response.data) {
        updatedDish.value = response.data.data;
      }
    } catch (err) {
      error.value = "Failed to insert dish";
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  const deleteDish = async (id: string) => {
    loading.value = true;
    try {
      const response = await axios.delete(url + "/" + id);

      if (response.data) {
        deletedDish.value = response.data.data;
      }
    } catch (err) {
      error.value = "Failed to delete dish";
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    dishes,
    dish,
    updatedDish,
    deletedDish,
    loading,
    error,
    getAllDishes,
    clearAllDishes,
    getDishById,
    insertDish,
    deleteDish,
  };
};
