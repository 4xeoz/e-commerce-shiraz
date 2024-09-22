import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { fetchProducts } from "@/app/api/admin/adminfetch";
import ActiveToggle, { ActiveToggleDropDown } from "./ActiveToggle";
import { MoreVertical } from "lucide-react";
import DeleteToggle from "./DeleteToggle";

const ProductsTable = async () => {
  const products = await fetchProducts();
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead></TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  src={product.imagePath}
                  alt={product.name}
                  className="w-10 h-10"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.priceInCents}</TableCell>
              <TableCell>{product._count.ProductOrder}</TableCell>
              <TableCell>{product.numberOfStock}</TableCell>
              <TableCell>
                <ActiveToggle isActive={product.isAvailable} />
              </TableCell>

                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <ActiveToggleDropDown isActive={product.isAvailable} id={product.id} />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <DeleteToggle productId={product.id} imagePath={product.imagePath}/>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
