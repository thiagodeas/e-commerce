import { create } from "zustand";
import { axiosCategoriesInstance } from "@/axiosConfig";

interface Category {
  _id: string;
  name: string;
}

interface CategoryStore {
  categories: Category[];
  catError: string | null;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  catError: null,
  fetchCategories: async () => {
    try {
      const response = await axiosCategoriesInstance.get("/");
      if (Array.isArray(response.data.categories)) {
        set({ categories: response.data.categories });
      } else {
        set({ catError: "Dados de categorias inválidos." });
      }
    } catch {
      set({ catError: "Erro ao carregar categorias." });
    }
  },
}));
