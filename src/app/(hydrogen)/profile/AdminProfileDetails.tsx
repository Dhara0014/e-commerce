/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useState } from 'react';
import AdminPostFeed from './admin-post-feed';
import cn from '@/utils/class-names';
import ChangePasswordFeed from '@/app/shared/profile/changePassword-feed';

export default function AdminProfileDetails() {
  const [modalData, setModalData] = useState({
    id: 'profile',
    count: 0,
  });
  // const showFields = !pathname?.includes('/edit');
  // const show = !pathname?.includes('/profile');
  const data = [
        { id: 'profile', count: 0 },
        { id: 'change Password', count: 0 },
      ];
  const [active, setActive] = useState(data[0].id);

  // useEffect(() => {
  //   setOpen(() => false);
  // }, [pathname]);

  function handleTabClick(id: string) {
    const selectedFeed = data?.filter((itm) => itm.id == id)[0];
    setModalData(selectedFeed);
    // setOpen(() => true);
    setActive(() => id);
  }

  return (
    <React.Fragment>
      <div className="mx-auto mt-10 w-full max-w-[1294px] @2xl:mt-7 @6xl:mt-0">
        <div className="-mx-4 flex items-center justify-around border-b-2 border-b-gray-200 font-medium sm:mx-0 md:justify-start md:gap-8">
                  {data.map((item) => (
                    <button
                      key={item.id}
                      className={cn(
                        'relative pb-4 font-semibold capitalize text-gray-500 focus:outline-none @4xl:pb-5 md:px-4',
                        active === item.id && 'text-gray-1000'
                      )}
                      onClick={() => handleTabClick(item.id)}
                    >
                      <span>{item.id}</span>
                      {active === 'posts' && item.id === 'posts' && (
                        <span className="absolute inset-x-0 -bottom-0.5 z-10 h-0.5 bg-gray-1000"></span>
                      )}
                    </button>
                  ))}
                </div>
        {modalData?.id == 'profile' && <AdminPostFeed />}
        {modalData?.id == 'change Password' && <ChangePasswordFeed />}
      </div>
    </React.Fragment>
  );
}
