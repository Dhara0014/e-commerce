'use client';
import HydrogenLayout from "@/app/layouts/hydrogen/layout";
import PageHeader from "@/app/shared/page-header";
import SettingsPostFeed from "./settings-post-feed";

const pageHeader = {
  title: "Settings",
  breadcrumb: [],
};

const Page = () => {
  return (
    <HydrogenLayout>
      <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      />
      <SettingsPostFeed />
      </>
    </HydrogenLayout>
  );
};

export default Page;
