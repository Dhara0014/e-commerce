/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { routes } from "@/config/routes";
import { BannerTable } from "@/app/shared/category/category-list/table";
import BannerPageHeader from "./category-page-header";
import HydrogenLayout from "@/app/layouts/hydrogen/layout";
import useBanner from "@/hooks/use-banner";

const pageHeader = {
  title: "Banner",
  breadcrumb: [
    {
      href: routes.banner.banner,
      name: "Home",
    },
    {
      href: routes.banner.banner,
      name: "Banner",
    },
    {
      name: "List",
      href: '',
    },
  ],
};

export default function Page() {
  const { banners, changeBannerStatus, deleteBanner, isLoading, addBanner, } =
    useBanner();    
    
  return (
    <HydrogenLayout>
      <>
      <BannerPageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        onAdd={addBanner}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <BannerTable
          data={banners}
          isLoading={isLoading}
          onDelete={deleteBanner}
          onStatusChange={changeBannerStatus}
        />
      )}
      </>
    </HydrogenLayout>
  );
}
