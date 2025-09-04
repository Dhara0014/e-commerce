/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { routes } from "@/config/routes";
import React from "react";
import HydrogenLayout from "@/app/layouts/hydrogen/layout";
import CreateEditProduct from "@/app/shared/products/create-edit/index";
import PageHeader from "@/app/shared/page-header";

const pageHeader = {
  title: "Create Product",
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
      name: "Create",
    },
  ],
};

export default function Page() {
  return (
    <HydrogenLayout>
      <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      />
      <CreateEditProduct show={false} cancle={true}/>
      </>
    </HydrogenLayout>
  );
}
