/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import cn from "@/utils/class-names";
import PostFeed from "@/app/shared/profile/post-feed";
import ChangePasswordFeed from "./changePassword-feed";
import ProductsTable from "../products/product-list/table";
import TransactionTable, { SellTable } from "../users/user-list/sellTransTable";
import UserReviews from "./user-reviews";
import useUser from "@/hooks/use-user";

export default function ProfileDetails({
  userData,
  userId,
  // changeUserProductStatus,
}: {
  userData: any;
  userId?: string | number | any;
  changeUserProductStatus?: any;
}) {
  const pathname = usePathname();
  const [modalData, setModalData] = useState({
    id: "profile",
    count: 0,
  });
  const [loading, setLoading] = useState(false);
  const [userProductData, setUserProductData] = useState<any[]>([]);
  const {
    userProduct,
    userSell,
    userPurchased,
    userReviews,
    userTransaction,
    changeUserProductStatus,
    productData,
    isLoading,
  } = useUser();
  const showFields = !pathname?.includes("/edit");
  const show = !pathname?.includes("/profile");
  const data = [
    { id: "profile", count: 0 },
    { id: "product", count: 0 },
    { id: "sales", count: 0 },
    { id: "purchases", count: 0 },
    { id: "reviews", count: 0 },
    { id: "transaction", count: 0 },
  ];
  const [active, setActive] = useState(data[0].id);

  useEffect(() => {
    window.location.hash = active;
  }, [active]);

  // useEffect(() => {
  //   if (changeUserProductStatus) {
  //     handleTabClick('product')
  //     // setActive('product');
  //     // setModalData(data?.filter(itm => itm?.id == 'product')[0]);
  //   }
  // }, [changeUserProductStatus]);

  async function handleTabClick(id: string) {
    window.location.hash = id;
    if (id === "product") {
      setLoading(true);
      const response = await userProduct({ userId: userId });
      // if (response?.status) {
      //   setUserProductData(response?.data);
      // } else {
      //   setUserProductData(response?.data);
      // }
    } else if (id === "sales") {
      const response = await userSell({ userId: userId });
      if (response?.status) {
        setUserProductData(response?.data);
      } else {
        setUserProductData(response?.data);
      }
    } else if (id === "purchases") {
      const response = await userPurchased({ userId: userId });
      if (response?.status) {
        setUserProductData(response?.data);
      } else {
        setUserProductData(response?.data);
      }
    } else if (id === "reviews") {
      const response = await userReviews({ userId: userId });
      if (response?.status) {
        setUserProductData(response?.data);
      } else {
        setUserProductData(response?.data);
      }
    } else if (id === "transaction") {
      const response = await userTransaction({ userId: userId });
      if (response?.status) {
        setUserProductData(response?.data);
      } else {
        setUserProductData(response?.data);
      }
    }

    const selectedFeed = data?.filter((itm) => itm.id == id)[0];
    setModalData(selectedFeed);
    // setOpen(() => true);
    setActive(() => id);
  }
  console.log(productData,"product data")
  console.log(userProductData,"user product data")

  return (
    <React.Fragment>
      <div className="mx-auto mt-10 w-full max-w-[1294px] @2xl:mt-7 @6xl:mt-0">
        <div className="-mx-4 flex items-center justify-around border-b-2 border-b-gray-200 font-medium sm:mx-0 md:justify-start md:gap-8">
          {data.map((item) => (
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
        {modalData?.id == "profile" && Object.values(userData)?.length > 0 && (
          <PostFeed data={userData} userId={userId} />
        )}
        {modalData?.id == "change password" && <ChangePasswordFeed />}
        {show && (
          <React.Fragment>
            <div className="mt-4">
              {modalData?.id == "product" &&
                (isLoading ? (
                  <p>Loading</p>
                ) : (
                  <ProductsTable
                    data={
                      // productData.length > 0 ?  productData : userProductData
                      productData
                    }
                    showFields={showFields}
                    onStatusChange={changeUserProductStatus}
                    isLoading={isLoading}
                    handleTabClick={handleTabClick}
                  />
                ))}
            </div>
            <div>
              {modalData?.id == "transaction" && (
                <TransactionTable
                  // data={user?.transaction}
                  data={userProductData}
                  showFields={!showFields}
                />
              )}
            </div>
            <div>
              {modalData?.id == "sales" && (
                <SellTable
                  // data={user?.sell_details}
                  data={userProductData}
                  showFields={!showFields}
                  name={modalData?.id}
                />
              )}
            </div>
            <div>
              {modalData?.id == "purchases" && (
                <SellTable
                  data={userProductData}
                  showFields={!showFields}
                  name={modalData?.id}
                />
              )}
            </div>
            <div>
              {modalData?.id == "reviews" && (
                <UserReviews data={userProductData} userId={userId} />
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}
