/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import HydrogenLayout from '@/app/layouts/hydrogen/layout';
import useCategory from '@/hooks/use-category';
import React, { useEffect } from 'react';
import CreateCategory from '@/app/shared/category/category-list/create-category';

const pageHeader = {
  title: 'Edit Category',
  breadcrumb: [
    {
      href: routes.category.category,
      name: 'Home',
    },
    {
      href: routes.category.category,
      name: 'Category',
    },
    {
      name: 'Edit',
      href: '',
    },
  ],
};
interface Params {
  id: string;
}

export default function EditCategoryPage({ params: paramsPromise }: { params: Promise<Params> }) {
  const {categoryData, categoryDetails, isLoading} = useCategory();
  const params = React.use(paramsPromise);

  useEffect(() => {
    if (params?.id) {
      categoryDetails(params.id);
    }    
  },[params])
  return (
    <HydrogenLayout>
      <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {(isLoading || Object.values(categoryData)?.length == 0)  ? <p>Loading</p> : <CreateCategory id={params.id} category={categoryData} hideFields={false} />}
      </>
    </HydrogenLayout>
  );
}
