/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Avatar, Button, Popover, Text, Title } from 'rizzui';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LocalStorageGetItem } from '@/app/shared/constants/LocalStorageData';

const menuItems = [
  {
    name: 'My Profile',
    href: routes.profile,
  },
  // {
  //   name: 'Account Settings',
  //   href: routes.forms.profileSettings,
  // },
  // {
  //   name: 'Activity Log',
  //   href: '#',
  // },
];

function DropdownMenu() {
  const router = useRouter();
  const adminData = LocalStorageGetItem('userData')?.data

  const signoutHandler = async() => {
    router.push(routes.auth.signIn);
    localStorage.clear();
  }

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <div style={{ backgroundColor: 'transparent' }}>
        <Avatar
          src={adminData?.profileImage || "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"}
          name={'profile'}
        />
        </div>
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            {/* Albert Flores */}
            {adminData?.name}
          </Title>
          {/* <Text className="text-gray-600">flores@doe.io</Text> */}
          <Text className="text-gray-600"> {adminData?.email} </Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={signoutHandler }
        >
          Sign Out
        {/* </Button>?callbackUrl */}
        </Button>
      </div>
    </div>
  );
}

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const adminData = LocalStorageGetItem('userData')?.data

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      <Popover.Trigger>
        <button
          className={cn(
            'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
            buttonClassName
          )}
        >
          <Avatar
            src={adminData?.profileImage ||"https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"}
            name={'profile1'}
            className={cn('!h-9 w-9 sm:!h-10 sm:w-10', avatarClassName)}
          />
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu />
      </Popover.Content>
    </Popover>
  );
}
