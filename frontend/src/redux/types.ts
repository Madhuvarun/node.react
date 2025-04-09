export type Product = {
  id: number;
  name: string;
  price: number;
};

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | boolean;
}
