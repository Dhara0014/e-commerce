/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import { useLayout } from "@/hooks/use-layout";
import cn from "@/utils/class-names";
import { useParams, usePathname } from "next/navigation";
import { userData } from "@/components/tableData/file";
import { Avatar, Text, Title } from "rizzui";
import { LAYOUT_OPTIONS } from "@/config/enums";

function formatDate(dateString:any) {
  const date = new Date(dateString);

  const day = date.getDate();
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Function to get the ordinal suffix for the day
  function getOrdinalSuffix(day:any) {
    if (day > 3 && day < 21) return "th"; // Covers 11th, 12th, 13th
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  const ordinal = getOrdinalSuffix(day);

  return `${day}${ordinal} ${month}, ${year}`;
}

export default function ProfileHeader({userData}: {userData:any}) {
  const { layout } = useLayout();
  const { id } = useParams();
  const [follow, setFollow] = useState(false);
  const pathname = usePathname();
  const show = !pathname?.includes("/profile");
  // const [user, setUser] = useState(userData?.filter((itm) => itm.id == id)[0]);
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
                  userData?.profileImage ||
                  "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
                }
                name="profile"
                // rounded="full"
                customSize={"(max-width: 768px) 100vw"}
                className="aspect-auto object-cover w-full h-full"
              />
            </div>
          </div>

          {show && (
            <div className="pt-2.5">
              <Title
                as="h1"
                className="text-lg font-bold capitalize leading-normal text-gray-900 @3xl:!text-xl 3xl:text-2xl"
              >
                {userData?.firstName} {userData?.lastName}
              </Title>
              <Text className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base">
                {userData?.email} | {userData?.phoneNumber}
              </Text>

              <ul className="mt-1 items-center gap-2 text-sm @3xl:mt-1 @3xl:gap-1 @3xl:text-base 3xl:text-lg">
                <li className="flex items-center">
                  <span className="me-1.5 text-sm text-gray-500">
                    Registered since
                  </span>
                  <span className="font-semibold text-sm text-gray-900">
                    {formatDate(userData?.createdAt)}
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="me-1.5 text-sm text-gray-500">
                    Average Rating
                  </span>
                  <span className="font-semibold text-sm text-gray-900">
                    {" "}
                    <span
                      className=""
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {userData?.avgRating ??  'No Ratings'}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
        {show && (
          <div className="flex flex-col gap-1 pt-2 @3xl:pt-4">
            <div>
              <span className="me-1.5 text-sm text-gray-500">
                Total balance
              </span>
              <span className="font-semibold text-gray-900"> ${ userData?.walletBalance?.totalBalance ?? 0 } </span>
            </div>
            <div>
              <span className="me-1.5 text-sm text-gray-500">
                Total earning
              </span>
              <span className="font-semibold text-gray-900">{" "} ${ userData?.walletBalance?.totalEarnings ?? 0 }  </span>
            </div>
            <div>
              <span className="me-1.5 text-sm text-gray-500">
                Pending earning
              </span>
              <span className="font-semibold text-gray-900">${ userData?.walletBalance?.totalSpend ?? 0 }</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
