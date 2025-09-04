/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import cn from "@/utils/class-names";
import PostFeed from "@/app/shared/profile/post-feed";
import { postData, followersData, followingData } from "@/data/profile-data";
import ChangePasswordFeed from "@/app/shared/profile/changePassword-feed";
import ProductsTable from "@/app/shared/products/product-list/table";
import { userData } from "../tableData/file";
import TransactionTable, { SellTable } from "@/app/shared/users/user-list/sellTransTable";
import UserReviews from "@/app/shared/profile/user-reviews";

let data = [
  { id: "products", count: followersData.length },
  { id: "sell", count: followingData.length },
  { id: "purchase", count: followingData.length },
  { id: "reviews", count: followingData.length },
  { id: "transaction", count: followingData.length },
];

export default function ProfileDetails() {
  const pathname = usePathname();
  const { id } = useParams();
  // const [user, setUser] = useState(userData?.filter((itm: { id: string | string[] | undefined; }) => itm.id == id)[0]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    id: "profile",
    count: 0,
  });
  const showFields = !pathname?.includes("/edit");
  const show = !pathname?.includes("/profile");
  if (show) {
    data = [
      { id: "products", count: followersData.length },
      { id: "sell", count: followingData.length },
      { id: "purchase", count: followingData.length },
      { id: "reviews", count: followingData.length },
      { id: "transaction", count: followingData.length },
    ];
  } else {
    data = [];
  }

  const tabs = showFields
    ? [{ id: "profile", count: postData.length }, ...data]
    : [
        { id: "profile", count: postData.length },
        { id: "change password", count: followersData.length },
        ...data,
      ];
  const [active, setActive] = useState(tabs[0].id);

  useEffect(() => {
    setOpen(() => false);
  }, [pathname]);

  function handleTabClick(id: string) {
    const selectedFeed = tabs?.filter((itm) => itm.id == id)[0];
    setModalData(selectedFeed);
    setOpen(() => true);
    setActive(() => id);
  }

  return (
    <React.Fragment>
      {/* <div className="mx-auto mt-10 w-full max-w-[1294px] @2xl:mt-7 @6xl:mt-0">
        <div className="-mx-4 flex items-center justify-around border-b-2 border-b-gray-200 font-medium sm:mx-0 md:justify-start md:gap-8">
          {tabs.map((item) => (
            <button
              key={item.id}
              className={cn(
                "relative pb-4 font-semibold capitalize text-gray-500 focus:outline-none @4xl:pb-5 md:px-4",
                active === item.id && "text-gray-1000"
              )}
              onClick={() => handleTabClick(item.id)}
            >
              <span>{item.id}</span>
              {active === "posts" && item.id === "posts" && (
                <span className="absolute inset-x-0 -bottom-0.5 z-10 h-0.5 bg-gray-1000"></span>
              )}
            </button>
          ))}
        </div>
        {modalData?.id == "profile" && <PostFeed user={user} />}
        {modalData?.id == "change password" && <ChangePasswordFeed />}
        {show && (
          <React.Fragment>
            <div className="mt-4">
              {modalData?.id == "products" && (
                <ProductsTable data={user?.products} showFields={showFields} />
              )}
            </div>
            <div>
              {modalData?.id == "transaction" && (
                <TransactionTable
                  data={user?.transaction}
                  showFields={!showFields}
                />
              )}
            </div>
            <div>
              {modalData?.id == "sell" && (
                <SellTable
                  data={user?.sell_details}
                  showFields={!showFields}
                  name={modalData?.id}
                />
              )}
            </div>
            <div>
              {modalData?.id == "purchase" && (
                <SellTable
                  data={user?.purchase_details}
                  showFields={!showFields}
                  name={modalData?.id}
                />
              )}
            </div>
            <div>
              {modalData?.id == "reviews" && (
                <UserReviews data={user?.reviews} />
              )}
            </div>
          </React.Fragment>
        )}
      </div> */}

      {/* <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setActive(() => 'posts');
        }}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
      >
        <div className="flex items-center justify-between pb-2 lg:pb-3">
          <Title
            as="h3"
            className="text-lg font-semibold text-gray-900 xl:text-xl"
          >
            {modalData.title}
          </Title>
          <Button
            variant="text"
            onClick={() => {
              setOpen(false);
              setActive(() => 'posts');
            }}
            className="h-auto px-1 py-1"
          >
            <PiXBold className="h-5 w-5 text-base" />
          </Button>
        </div>
        {modalData && <FollowerModal data={modalData.data} />}
      </Modal> */}
    </React.Fragment>
  );
}
