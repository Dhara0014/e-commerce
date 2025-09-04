import HydrogenLayout from '@/app/layouts/hydrogen/layout';
import PageHeader from '@/app/shared/page-header';
import FileDashboard from '@/components/dashboard';
import React from 'react'

const Page = () => {
  const pageHeader = {
      title: "Dashboard",
      breadcrumb: [],
    };
    return (
      <HydrogenLayout>
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
        <FileDashboard />
      </HydrogenLayout>
    );
}

export default Page
