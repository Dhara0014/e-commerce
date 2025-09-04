/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import HydrogenLayout from "@/app/layouts/hydrogen/layout";
import PageHeader from "@/app/shared/page-header";
import React from "react";
import AdminProfileHeader from "./AdminProfileHeader";
import AdminProfileDetails from "./AdminProfileDetails";

const pageHeader = {
  title: "Edit Profile",
  breadcrumb: [],
};

const Page = () => {
  return (
    <HydrogenLayout>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <div className="@container">
        <AdminProfileHeader />
        <AdminProfileDetails />
      </div>
    </HydrogenLayout>
  );
};

export default Page;
