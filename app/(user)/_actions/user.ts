import { db } from "@/auth/db";

export async function fetchProducts() {
  const products = await db.product.findMany({});
    return products;
}