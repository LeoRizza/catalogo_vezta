export type Product = {
  id: string;
  name: string;
  brand?: string;
  origin?: string;
  category?: string;
  subcategory?: string;
  description?: string;
  longDescription?: string;
  price?: number;
  images?: string[];
  videoUrl?: string;
  sku?: string;
  tags?: string[];
};
