/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileDetails from '@/app/shared/profile/profile-details';
import ProfileHeader from '@/app/shared/profile/profile-header';
import HydrogenLayout from '@/app/layouts/hydrogen/layout';
import useUser from '@/hooks/use-user';
import React, { useEffect } from 'react';

const pageHeader = {
  title: 'Edit User',
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
      name: 'Edit',
    },
  ],
};

interface Params {
  id: string;
}
export default function UserEditPage({ params: paramsPromise }: { params: Promise<Params> }) {
  const {userData, userDetails, isLoading, changeUserProductStatus} = useUser();
  const params = React.use(paramsPromise);
  useEffect(() => {
    
    if (params?.id) {
      userDetails(params?.id);
    }
  },[params]);
  
  return (
    <HydrogenLayout>
      <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      </PageHeader>
      {isLoading ? <p>Loading</p> :<div className="@container">
        <ProfileHeader userData={userData} />
        <ProfileDetails userData={userData} userId={params?.id} 
        changeUserProductStatus={changeUserProductStatus}
        />
      </div>}
      </>
    </HydrogenLayout>
  );
}
