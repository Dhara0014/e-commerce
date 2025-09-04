/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";
import ProductsTable from "@/app/shared/products/product-list/table";
import HydrogenLayout from "@/app/layouts/hydrogen/layout";
import useProduct from "@/hooks/use-product";
import Link from "next/link";
import { Button } from "rizzui";
import { PiPlusBold } from "react-icons/pi";

const pageHeader = {
  title: "Product",
  breadcrumb: [
    {
      href: routes.products.product,
      name: "Home",
    },
    {
      href: routes.products.product,
      name: "Product",
    },
    {
      name: "List",
      href: ''
    },
  ],
};

export default function Page() {
  const { products, isLoading, changeProductStatus, delteProduct, updateProductApprovalStatus } = useProduct();
  return (
    <HydrogenLayout>
      <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.products.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button
            as="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Product
          </Button>
        </Link>
      </PageHeader>

      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ProductsTable
          data={products}
          isLoading={isLoading}
          onDelete={delteProduct}
          onStatusChange={changeProductStatus}
          onupdateProductApprovalStatus={updateProductApprovalStatus}
          showFields={false}
        />
      )}
      </>
    </HydrogenLayout> 
  );
}
