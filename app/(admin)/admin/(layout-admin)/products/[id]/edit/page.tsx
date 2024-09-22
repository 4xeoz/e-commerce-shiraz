import { fetchProductById } from "@/app/api/admin/adminfetch";
import React from "react";
import EditForm from "./_component/EditForm";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await fetchProductById(id);

  return (
    <div>
      <h1>Edit Product</h1>
      <EditForm
        product={
          product ?? {
            id: "",
            name: "",
            priceInCents: 0,
            imagePath: "",
            description: "",
            numberOfStock: 0,
            isAvailable: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        }
      />
    </div>
  );
};

export default Page;
