/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { useState } from "react";
import { useLayout } from "@/hooks/use-layout";
import cn from "@/utils/class-names";
import { useParams,} from "next/navigation";
import { userData } from "@/components/tableData/file";
import { Avatar, Text, Title } from "rizzui";
import { LAYOUT_OPTIONS } from "@/config/enums";
import { LocalStorageGetItem } from '@/app/shared/constants/LocalStorageData';

export default function AdminProfileHeader() {
  const { layout } = useLayout();
  const { id } = useParams();
  const [follow, setFollow] = useState(false);
  // const [user, setUser] = useState(userData?.filter((itm) => itm.id == id)[0]);
  const adminData = LocalStorageGetItem('userData')?.data
  return (
    <div
      className={cn(layout === LAYOUT_OPTIONS.LITHIUM ? "3xl:-mt-4" : "mt-0")}
    >
      <div className="-mx-6 h-[150px] bg-gradient-to-r from-[#F8E1AF] to-[#F6CFCF] @5xl:h-[200px] 3xl:-mx-8  3xl:h-[250px] 4xl:-mx-10 4xl:h-[300px]" />

      <div className="mx-auto w-full max-w-[1294px] @container @5xl:mt-0 @5xl:pt-4 sm:flex sm:justify-between">
        <div className="flex h-auto gap-4 @5xl:gap-6">
          <div>
            <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-4 border-white bg-white shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] md:border-[6px] 3xl:w-[200px]">
            <Avatar
                src={
                  adminData?.profileImage ||
                  "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
                }
                name="profile"
                // rounded="full"
                customSize={"(max-width: 768px) 100vw"}
                className="aspect-auto object-cover w-full h-full"
              />
            </div>
          </div>

          {/* {show && ( */}
            <div className="pt-2.5">
              <Title
                as="h1"
                className="text-lg font-bold capitalize leading-normal text-gray-900 @3xl:!text-xl 3xl:text-2xl"
              >
                {/* {'Admin'} {'Admin'} */}
                {adminData?.name}
              </Title>
              <Text className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base">
                {adminData?.email}
              </Text>
            </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
