import axios from "../axios";
import { Product } from "../../types";

export const fetchProductsAPI = async (
  queryString: string
): Promise<Product[]> => {
  console.log("final frontend");
  const result = await axios.get(`/product/search`, {
    params: { q: queryString },
  });
  return result.data;
};
