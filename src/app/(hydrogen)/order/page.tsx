/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import PageHeader from "@/app/shared/page-header";
import HydrogenLayout from "@/app/layouts/hydrogen/layout";
import OrderTable from "@/components/orders/order-list/table";
import { routes } from "@/config/routes";
import useOrder from "@/hooks/use-order";
import { useEffect } from "react";

const pageHeader = {
  title: "Order",
  breadcrumb: [
    {
      href: routes.orders.order,
      name: "Home",
    },
    {
      href: routes.orders.order,
      name: "Order",
    },
    {
      name: "List",
      href: ''
    },
  ],
};

export default function Page() {
  const { orders, isLoading, fetchOrder } = useOrder();  
  
  return (
    <HydrogenLayout>
      <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {isLoading ? <p>Loading</p> : <OrderTable data={orders} fetchOrder={fetchOrder} />}
      </>
     </HydrogenLayout> 
  );
}
