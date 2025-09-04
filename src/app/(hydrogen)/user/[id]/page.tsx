/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import ProfileDetails from '@/app/shared/profile/profile-details';
import ProfileHeader from '@/app/shared/profile/profile-header';
import HydrogenLayout from '@/app/layouts/hydrogen/layout';
import useUser from '@/hooks/use-user';
import React, { useEffect } from 'react';

const pageHeader = {
  title: 'View User',
  breadcrumb: [
    {
      href: routes.users.user,
      name: 'Home',
    },
    {
      href: routes.users.user,
      name: 'User',
    },
    {
      name: 'Details',
    },
  ],
};
interface Params {
  id: string;
}
export default function InvoiceDetailsPage({ params: paramsPromise }: { params: Promise<Params> }) {
  const {userData, userDetails, isLoading} = useUser();
  const params = React.use(paramsPromise);
 useEffect(() => {
     
     if (params?.id) {
       userDetails(params?.id);
     }
   },[params]);  
  
  return (
    <HydrogenLayout>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {isLoading ? <p>Loading</p>:<div className="">
        <ProfileHeader userData={userData} />
        <ProfileDetails userData={userData} userId={params?.id} />
      </div>}
    
    </HydrogenLayout>
  );
}
