import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductsTable from "./_component/ProductsTable";

const page = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1>products</h1>
        <div>
          <Button asChild>
            <Link href="/admin/products/new">add products</Link>
          </Button>
        </div>
      </div>

      <ProductsTable />
    </div>
  );
};

export default page;
