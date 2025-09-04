/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import PageHeader from '@/app/shared/page-header';
import OrderView from '@/components/orders/order-view';
import HydrogenLayout from '@/app/layouts/hydrogen/layout';
import { routes } from '@/config/routes';
import useOrder from '@/hooks/use-order';
import React, { useEffect } from 'react';

interface Params {
  id: string|number;
}

export default function OrderDetailsPage({ params: paramsPromise }: { params: Promise<Params> }) {
  const params = React.use(paramsPromise);
  const {isLoading, orderDetails, viewOrder} = useOrder();
    const pageHeader = {
      title: `View Order`,
      breadcrumb: [
        {
          href: routes.orders.order,
          name: 'Home',
        },
        {
          href: routes.orders.order,
          name: 'Order',
        },
        {
          // name: params.id,
          name: 'Details',
        },
      ],
    };
    
  useEffect(() => {
    if (params?.id) {
      viewOrder(params.id);
    }    
  },[params]);
  return (
    <HydrogenLayout>
      <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {(isLoading || Object.values(orderDetails)?.length == 0) ? <p>Loading</p> : <OrderView data={orderDetails} />}
      </>
    </HydrogenLayout>
  );
}
