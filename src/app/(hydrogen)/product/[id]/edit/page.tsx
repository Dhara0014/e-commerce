/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";
import CreateEditProduct from "@/app/shared/products/create-edit";
import HydrogenLayout from "@/app/layouts/hydrogen/layout";
import useProduct from "@/hooks/use-product";
import React, { useEffect } from "react";

const pageHeader = {
  title: "Edit Product",
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
      name: "Edit",
    },
  ],
};
interface Params {
  id: string;
}

export default function ProductEditPage({ params: paramsPromise }: { params: Promise<Params> }) {
  const {productData, productDetails, isLoading} = useProduct();
  const params = React.use(paramsPromise);
  useEffect(() => {
    if (params?.id) {
      productDetails(params.id);
    }    
  },[params]); 
  return (
    <HydrogenLayout>
      <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {(isLoading || Object.values(productData)?.length == 0) ? <p>Loading</p> : <CreateEditProduct id={params?.id} product={productData} show={false} cancle={true}/>}
      </>
    </HydrogenLayout>
  );
}
