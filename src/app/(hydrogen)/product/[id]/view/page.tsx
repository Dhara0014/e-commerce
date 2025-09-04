/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateEditProduct from '@/app/shared/products/create-edit';
// import { productsData } from '@/app/shared/products/products-data';
import HydrogenLayout from '@/app/layouts/hydrogen/layout';
import useProduct from '@/hooks/use-product';
import React, { useEffect } from 'react';
interface Params {
  id: string;
}

export default function ProductDetailsPage({ params: paramsPromise }: { params: Promise<Params> }) {
  const {productData, productDetails, isLoading} = useProduct();
  const params = React.use(paramsPromise);
  useEffect(() => {
    if (params?.id) {
      productDetails(params.id);
    }    
  },[params]);
  const pageHeader = {
    title: 'View Product',
    breadcrumb: [
      {
        href: routes.products.product,
        name: 'Home',
      },
      {
        href: routes.products.product,
        name: 'Product',
      },
      {
        name: 'Details',
      },
    ],
  };
  return (
    <HydrogenLayout>
      <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {(isLoading || Object.values(productData)?.length == 0) ? <p>Loading</p> : <CreateEditProduct id={params?.id} product={productData} show={true} cancle={false} />}
      </>
    </HydrogenLayout>
  );
}
