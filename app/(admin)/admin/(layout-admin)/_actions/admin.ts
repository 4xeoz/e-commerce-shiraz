"use server";

import { number, z } from "zod";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import { db } from "@/auth/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import exp from "constants";

// Define the schema for product validation using zod
const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters long."),
  priceInCents: z.coerce.number(),
  image: z.instanceof(File), // Expect a file for image
});

// Function to handle the form submission and product upload
export async function addProduct(prevState: unknown, formData: FormData) {
  // Extract and validate the data from the form
  const productData = {
    name: formData.get("name"),
    description: formData.get("description"),
    priceInCents: formData.get("priceInCents"),
    image: formData.get("image"),
  };

  const validatedProduct = productSchema.safeParse(productData);

  if (validatedProduct.success === false) {
    return validatedProduct.error.formErrors.fieldErrors;
  }

  const isNameConflict = await db.product.findMany({
    where: {
      name: validatedProduct.data.name,
    },
  });

  if (isNameConflict.length > 0) {
    return {
      name: ["Product name already exists"], // Ensuring the error format is consistent
      description: [],
      priceInCents: [],
      image: [],
    };
  }

  // Upload the image and get the URL
  const imageUrl = await uploadImage(validatedProduct.data.image);

  // You can now save this data to your database, etc.
  await db.product.create({
    data: {
      name: validatedProduct.data.name,
      description: validatedProduct.data.description,
      priceInCents: validatedProduct.data.priceInCents,
      imagePath: imageUrl as string,
      isAvailable: false,
      numberOfStock: 1,
    },
  });

  redirect("/products");
}

async function uploadImage(file: File) {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const fileName = new Date().toISOString() + "-" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch(reject);
      }
    );
  });
}

export async function ToggleActivePorduct(
  isActive: boolean,
  productId: string
) {
  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      isAvailable: isActive,
    },
  });
  revalidatePath("/products");
}

export async function deleteProduct(productId: string, imageUrl: string) {
  await db.product.delete({
    where: {
      id: productId,
    },
  });
  await deleteImage(imageUrl);
  revalidatePath("/products");
}

async function deleteImage(imageUrl: string | undefined) {
  try {
    const storage = getStorage(app);

    // Create a reference to the file to delete
    const storageRef = ref(storage, imageUrl);

    // Delete the file
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

const editProductSchema = productSchema.extend({
  numberInStock: z.coerce.number().int().min(0),
  image: z.optional(z.instanceof(File)),
});

export async function updateProduct(
  productId: string,
  prevState: unknown,
  formData: FormData
) {
  const product = await db.product.findUnique({ where: { id: productId } });

  const productData = {
    name: formData.get("name"),
    description: formData.get("description"),
    priceInCents: formData.get("priceInCents"),
    numberInStock: formData.get("stock"),
    image: formData.get("image"),
  };

  const validatedProduct = editProductSchema.safeParse(productData);

  if (!validatedProduct.success) {
    return validatedProduct.error.formErrors.fieldErrors;
  }

  const isNameConflict = await db.product.findMany({
    where: {
      name: validatedProduct.data.name,
      id: {
        not: productId,
      },
    },
  });

  if (isNameConflict.length > 0) {
    return {
      name: ["Product name already exists"],
      description: [],
      priceInCents: [],
      image: [],
    };
  }
  let imageUrl = product?.imagePath;

  if (validatedProduct.data.image && validatedProduct.data.image.size > 0) {
    imageUrl = await uploadImage(validatedProduct.data.image) as string;
    await deleteImage(product?.imagePath);
  }

  await db.product.update({
    where: { id: productId },
    data: {
      name: validatedProduct.data.name,
      description: validatedProduct.data.description,
      priceInCents: validatedProduct.data.priceInCents,
      numberOfStock: validatedProduct.data.numberInStock,
      imagePath: imageUrl,
    },
  });


  redirect("/admin/products");
}

export async function getAllOrders() {
  const orders = await db.order.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
}
