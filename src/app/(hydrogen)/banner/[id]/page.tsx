/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import  { CreateBanner } from '@/app/shared/category/category-list/create-category';
import HydrogenLayout from '@/app/layouts/hydrogen/layout';
import useBanner from '@/hooks/use-banner';
import React, { useEffect } from 'react';

const pageHeader = {
  title: 'View Banner',
  breadcrumb: [
    {
      href: routes.banner.banner,
      name: 'Home',
    },
    {
      href: routes.banner.banner,
      name: 'Banner',
    },
    {
      name: 'Details',
    },
  ],
};

interface Params {
  id: string;
}

export default function EditBannerPage({ params: paramsPromise }: { params: Promise<Params> }) {
  const { bannerData, bannerDetails, isLoading } = useBanner();
  const params = React.use(paramsPromise);
  
  useEffect(() => { 
    if (params?.id) {
      bannerDetails(params.id);
    }
  }, [params?.id]);

  return (
    <HydrogenLayout>
      <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {(isLoading || Object.values(bannerData)?.length == 0) ? <p>Loading </p> : <CreateBanner id={params?.id} banner={bannerData} hideFields={true} />}
      </>
    </HydrogenLayout>
  );
}
